// controllers/PaymentController.js
import StripeService from '../services/stripeService.js';
import pagosModel from '../models/pagosModel.js';
import generateQrCode from '../services/qrCodeGenerator.js';
import PaypalService from '../services/paypalService.js';
import SquareService from '../services/squareService.js';

class PaymentController {
    static async createPayment(req, res) {
        const { items, user_id } = req.body;

        console.log(user_id)

        try {
            // Crear sesión de Stripe
            const session = await StripeService.createCheckoutSession(items);

       const checkoutUrl = session.url;

       const sessionId= session.id;
       console.log(sessionId)

            // Generar código QR
  
    const qrCode = await generateQrCode(checkoutUrl);

            // Obtener el estado de la compra desde la sesión de Stripe
            const paymentStatus = session.payment_status; // Puedes revisar otros campos como session.status si es necesario

            console.log(paymentStatus)

     // Calcular el monto total de la compra
     const totalAmount = items.reduce((total, item) => total + item.amount * item.quantity, 0);
 console.log(totalAmount)
           //  Guardar pago en la base de datos
          const result = await pagosModel.addPago(user_id,sessionId,qrCode,totalAmount,paymentStatus);
         const idPago = result.insertId;
console.log(idPago)
            // Insertar los productos comprados en la base de datos
            for (const item of items) {
                const { product_id, amount, quantity } = item;
                await pagosModel.detalles_pagos(idPago, product_id, quantity, amount)
            
            }

            // Devolver la URL de Stripe al cliente
            return res.json({ url: session.url,id:session.id,qrCode });

        } catch (error) {
            console.error('Error en el proceso de pago:', error);
            return res.status(500).json({ message: error.message });
        }
    }

  
    // Endpoint para obtener un pago por ID
    static async getPaymentById(req, res) {

        try {
            const { sessionId } = req.query;
            console.log(sessionId)

            const payment = await pagosModel.getPaymentById(sessionId);
            if (!payment) {
                return res.status(404).json({ message: 'Pago no encontrado' });
            }
            
            const updateStatus= await  pagosModel.updateStatusPayment(sessionId)
           const paymentRetrieve= await StripeService.getPaymentDetails(sessionId)
console.log(paymentRetrieve)
            res.status(200).json(paymentRetrieve);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener el pago' });
            console.error(error)
        }
    }



    static async createPaymentPaypal(req,res){
        try{
        const { items, user_id } = req.body;

        const order = await PaypalService.createOrder(items)
      
        const paymentId= order.id
        const status= order.status
    //    console.log(paymentId)
        console.log(user_id)
      //  console.log(status)
       // const returnUrl = `http://localhost:5000/paypal/capturePaymentPaypal?orderId=${order.id}`;
        const approvalUrl = order.links.find(link => link.rel === 'approve').href;
        

        const totalAmount = items.reduce((total, item) => total + (item.amount * item.quantity)/100, 0);
        console.log(totalAmount)

            // Generar código QR
  
    const qrCode = await generateQrCode(approvalUrl);

    const result = await pagosModel.addPagoPaypal(user_id,paymentId,qrCode,totalAmount,status);
    const idPago = result.insertId;
    console.log(idPago)

    for (const item of items) {
        const { product_id, amount, quantity } = item;
        await pagosModel.detalles_pagos(idPago, product_id, quantity, amount)
    
    }



         // Enviar la respuesta con el ID del pedido y la URL de aprobación
         res.status(200).json({ id: order.id, approvalUrl,qrCode });
         } catch(error){  
            console.error(error); // Log para depurar
            res.status(400).json({ error: error.message });

       }

    }

    static async capturePaymentPaypal(req,res){

        try{
        const { token } =req.query;

        console.log(token)

        const capture= await PaypalService.capturePaymentPaypal(token)

        console.log(capture)

          // Revisar el estado de la captura
        if (capture.status === 'COMPLETED') {
            res.status(200).json({
                status: 'success',
                message: 'Payment captured successfully',
                details: capture // Detalles del pago capturado
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Payment capture failed',
                details: capture // Detalles del error
            });
        }

    }catch(error){
            console.error('Error al capturar el pago:', error);
            res.status(500).json({ success: false, message: 'Error al capturar el pago' });
        }
    }


}





export default PaymentController;

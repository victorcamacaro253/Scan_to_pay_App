// models/PaymentModel.js

import  { query }  from "../config/db.js";

class PaymentModel {
    // Crear un registro de pago
    static async addPago(userId, stripePaymentId,qrcode,totalAmount, paymentStatus ) {
        const sql = `
            INSERT INTO pagos (id_usuario,stripe_payment_id, monto,qr_code,estado,fecha)
            VALUES (?, ?, ?,?,?, NOW())
        `;
        const result = await query(sql, [userId,stripePaymentId,totalAmount,qrcode, paymentStatus]);
        return result;
    }
    

    static async detalles_pagos(pago_id,producto_id,cantidad,precio){
        const queryl=   `INSERT INTO detalles_pago (pago_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`;
        await query(queryl,[pago_id,producto_id,cantidad,precio])
    }
    
    // Obtener un pago por ID
    static async getPaymentById(sessionId) {
        const queryl = 'SELECT * FROM pagos WHERE stripe_payment_id = ?';
        const rows = await query(queryl, [sessionId]);
        return rows;
    }

    static async updateStatusPayment(sessionId){
        const queryl = 'UPDATE pagos SET estado = "finalizado" WHERE stripe_payment_id = ?';
        const result= await query(queryl,[sessionId])
        return result;
    }


      // Crear un registro de pago
      static async addPagoPaypal(userId, paypalPaymentId,qrcode,totalAmount, paymentStatus ) {
        const sql = `
            INSERT INTO pagos (id_usuario,paypal_payment_id, monto,qr_code,estado,fecha)
            VALUES (?, ?, ?,?,?, NOW())
        `;
        const result = await query(sql, [userId,paypalPaymentId,totalAmount,qrcode, paymentStatus]);
        return result;
    }

}

export default PaymentModel;

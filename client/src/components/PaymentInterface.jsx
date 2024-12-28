import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcStripe, faPaypal } from '@fortawesome/free-brands-svg-icons';
import Modal from '../modal';

const PaymentInterface = () => {
    const [cart,setCart]=useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [qrCode,setQrCode] = useState(null)
    const [paymentUrl,setPaymentUrl] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('');





  useEffect(()=>{
    const storedCart = localStorage.getItem('cart');
    console.log('victor',storedCart)
    if(storedCart){
        setCart(JSON.parse(storedCart))
        console.log(cart)
    }
  },[])

   // Función para calcular el total del carrito
   const calculateTotal = () => {
    return cart.reduce((total, item) => {
        return total + (item.amount * item.quantity);
    }, 0) / 100; // Dividir por 100 si el monto está en centavos

   }
    const handleCloseModal = () => {
        setIsOpen(false);
        setQrCode(null); // Limpiar el QR cuando se cierre el modal
    setPaymentUrl(null);
      };


      const handleOpenModal = (method) => {
        setIsOpen(true);
        setPaymentMethod(method);
        generateQrCode(method); // Llamar a la función generateQrCode aquí
      };

      
  const generateQrCode = async (method) => {
    try {
   /*   let response;
      if (method === 'stripe') {
        response = await fetch('http://localhost:5000/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items:cart, user_id: 1 }),
        });
      } else if (method === 'paypal') {
        response = await fetch('http://localhost:5000/payments/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items:cart, user_id: 1 }),
        });
      }
  
      const data = await response.json();
     console.log(data)*/

     const url =
     method === 'stripe'
       ? 'http://localhost:5000/payments'
       : 'http://localhost:5000/payments/paypal';

   const response = await fetch(url, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ items: cart, user_id: 1 }),
   });

   const data = await response.json();
   console.log(data);
      if (data.qrCode) {
        setQrCode(data.qrCode);
        setPaymentUrl(data.url || data.approvalUrl);
      } else {
        console.error('Error al crear la sesión de pago:', data);
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };


    
  return (
    <div>
    
    {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) :         (
          <div>
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  {/* Product Image */}
                  <img
                    src={`/img/${item.imagen}`}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                  />
                  {/* Product Details */}
                  <div className="flex-grow-1">
                    <p><strong>{item.name}</strong></p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio por unidad: ${(item.amount / 100).toFixed(2)}</p>
                    <p>Total: ${(item.amount * item.quantity / 100).toFixed(2)}</p>
                  </div>
                  {/* Remove Product Button */}
                  
                </li>
              ))}
            </ul>
         
          </div>
        )}
                <h3>Total: ${(calculateTotal()).toFixed(2)}</h3>


       <button className='btn btn-outline-primary' onClick={() => handleOpenModal('stripe')}>
        <FontAwesomeIcon icon={faCcStripe} />
        Pagar con Stripe
      </button>
      <button className='btn btn-outline-primary' onClick={() => handleOpenModal('paypal')}>
        <FontAwesomeIcon icon={faPaypal} />
        Pagar con PayPal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        qrCode={qrCode}
        paymentUrl={paymentUrl}
        paymentMethod={paymentMethod}
        handlePayment={paymentMethod}
      />
    
    
    </div>
  );
};

export default PaymentInterface;
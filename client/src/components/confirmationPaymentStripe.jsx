import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHouse } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de importar desde el paquete correcto


const PaymentConfirmationStripe = () =>{
    const [paymentStatus, setPaymentStatus] = useState('');
    const [error, setError] = useState('');
    const [paymentDetails, setPaymentDetails] = useState(null); // New state for payment details


   useEffect(()=>{
    const fetchPaymentDetails = async () =>{
        console.log('window.location.search:', window.location.search);
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)
        const token= urlParams.get('sessionId') 
console.log(token)
        if(token){
            try {
                const response= await fetch(`http://localhost:5000/payments/success?sessionId=${token}`)
                const data = await response.json();
if (data) {
    console.log(data)

}else{
    console.log('No se encontro datos')
}
                
                if (data.paymentIntent.status === 'succeeded') {
                    setPaymentStatus('¡Pago completado con éxito!');
                    setPaymentDetails(data); 
                    localStorage.removeItem('cart');
                } else if (data.status === 'CAPTURED') {
                    setPaymentStatus('Pago ya capturado.');
         
                  }  else {
                    setPaymentStatus('Error al completar el pago.');
                    setError(data.message);
                }

            } catch (error) {
                console.error('Error al obtener los detalles del pago:', error);
                    setPaymentStatus('Error al obtener los detalles del pago.');
                    setError(error.message);
            }
        }
    }
    fetchPaymentDetails()
   },[])


   const handleHome=()=>{
    window.location.href = '/'
   }

  return (
    <div>
           <h1>Estado del Pago</h1>
          {paymentStatus && <p>{paymentStatus}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

      {paymentDetails && (
        <div>
            <h2>Estado del Pago</h2>
            <p><strong>Id de Pago: </strong>{paymentDetails.paymentIntent.id}</p>
            <p><strong>Estatus: </strong>{paymentDetails.session.payment_status}</p>
            <p><strong>Nombre: </strong>{paymentDetails.session.customer_details.name}</p>
            <p><strong>Email: </strong>{paymentDetails.session.customer_details.email}</p>
            <p><strong>Pais: </strong>{paymentDetails.session.customer_details.address.country}</p>

            <h2>Detalles del Pago</h2>
            <p>
         <strong>Monto Total:</strong>  {paymentDetails.paymentIntent.amount} {paymentDetails.paymentIntent.currency}
         </p>

         <p>
         <strong>Monto Neto:</strong>  {paymentDetails.paymentIntent.amount} {paymentDetails.paymentIntent.currency}
         </p>

         <p>
         <strong>Metodo de Pago: </strong>  {paymentDetails.session.payment_method_types[0]} 
         </p>
        </div>
      )}

    
<button className='btn btn-outline-primary' onClick={() => handleHome()}>
<FontAwesomeIcon icon={faHouse} />        Ir a inicio
      </button>

    </div>
  )  
}

export default PaymentConfirmationStripe
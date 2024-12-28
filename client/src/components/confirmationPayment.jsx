import React, { useEffect, useState } from 'react';


const PaymentConfirmation = () => {
    const [paymentStatus, setPaymentStatus] = useState('');
    const [error, setError] = useState('');
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                try {
                    const response = await fetch(`http://localhost:5000/paypal/capturePaymentPaypal?token=${token}`);
                    const data = await response.json();
                    console.log('victor', data);

                    if (data.status === 'success') {
                        setPaymentStatus('¡Pago completado con éxito!');
                        setPaymentDetails(data);
                    } else if (data.status === 'CAPTURED') {
                        setPaymentStatus('Pago ya capturado.');
                    } else {
                        setPaymentStatus('Error al completar el pago.');
                        setError(data.message);
                    }
                } catch (error) {
                    console.error('Error al obtener los detalles del pago:', error);
                    setPaymentStatus('Error al obtener los detalles del pago.');
                    setError(error.message);
                }
            }
        };

        fetchPaymentDetails();
    }, []);

    return (
        <div>
            <h1>Estado del Pago</h1>
            {paymentStatus && <p>{paymentStatus}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {paymentDetails && (
                <div>
                    <h2>Detalles del Pago</h2>
                    <p><strong>ID de Orden:</strong> {paymentDetails.details?.id}</p>
                    <p><strong>Estado:</strong> {paymentDetails.status}</p>
                    <p>
                        <strong>Nombre del Payer:</strong> 
                        {paymentDetails.details?.payer?.name?.given_name} 
                        {paymentDetails.details?.payer?.name?.surname}
                    </p>
                    <p><strong>Correo:</strong> {paymentDetails.details?.payer?.email_address}</p>

                    <h3>Productos</h3>
                    {paymentDetails.details?.purchase_units?.[0]?.items?.length > 0 ? (
                        <ul>
                            {paymentDetails.details.purchase_units[0].items.map((item, index) => (
                                <li key={index}>
                                    {item.name} - {item.quantity} - {item.unit_amount.value} {item.unit_amount.currency_code}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron productos</p>
                    )}

                    <h2>Detalles del Pago</h2>
                    {paymentDetails.details?.purchase_units?.[0]?.payments?.captures?.[0] ? (
                        <div>
                            <p>
                                <strong>Monto Total:</strong> 
                                {paymentDetails.details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value} 
                                {paymentDetails.details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.currency_code}
                            </p>
                            <p>
                                <strong>Monto Neto:</strong> 
                                {paymentDetails.details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value} 
                                {paymentDetails.details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.currency_code}
                            </p>
                            <p>
                                <strong>Comisión PayPal:</strong> 
                                {paymentDetails.details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value} 
                                {paymentDetails.details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.currency_code}
                            </p>
                        </div>
                    ) : (
                        <p>No se encontraron datos del pago</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentConfirmation;

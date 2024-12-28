import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET); 
const paypalClient = new paypal.core.PayPalHttpClient(environment);


class PaypalService {

static async createOrder(items) {
    const orderRequest = new paypal.orders.OrdersCreateRequest();

    // Calculate total and item breakdown
    const totalValue = items.reduce((total, item) => 
        total + (item.amount * item.quantity) / 100, 0
    ).toFixed(2);

    orderRequest.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: totalValue,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: totalValue,
                        },
                    },
                },
                items: items.map(item => ({
                    name: item.name,
                    description: item.description || '', // Optional fallback
                    unit_amount: {
                        currency_code: 'USD',
                        value: (item.amount / 100).toFixed(2),
                    },
                    quantity: item.quantity.toString(), // Ensure quantity is a string
                })),
            },
        ],
        application_context: {
            return_url: 'http://localhost:5173/payment-confirmation',
            //return_url:  'http://localhost:5000/paypal/capturePaymentPaypal',

            cancel_url: 'http://localhost:5000/paypal/cancel',
        },
    });

    try {
        const order = await paypalClient.execute(orderRequest);

        return order.result;
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        throw new Error('Failed to create PayPal order.');
    }
}


static async capturePaymentPaypal(orderId) {
    try {
        const captureRequest = new paypal.orders.OrdersCaptureRequest(orderId);
        const capture = await paypalClient.execute(captureRequest);
        return capture.result;
    } catch (error) {
        console.error('Error executing PayPal capture request:', error);
        throw new Error('Capture request failed');
    }
}
    
}
    
export default PaypalService

    
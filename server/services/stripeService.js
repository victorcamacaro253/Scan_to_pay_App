// services/StripeService.js
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class StripeService {
    // Crea una sesión de pago en Stripe
    static async createCheckoutSession(items) {
        const line_items = items.map(item => ({
            price_data: {
                product_data: {
                    name: item.name,
                    description: item.description
                },
                unit_amount: item.amount * 100, // Stripe usa centavos
                currency: 'usd'
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
           success_url:`http://localhost:5173/payment-stripe-confirmation?sessionId={CHECKOUT_SESSION_ID}`,
           // success_url:`http://localhost:5000/payments/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:5000/cancel',
        });

        return session;
    }

    // Nueva función para obtener los detalles de un pago
    static async getPaymentDetails(sessionId) {
        try {
            // Utilizamos el método de Stripe para recuperar la sesión de pago
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            // También puedes obtener más detalles sobre los pagos relacionados
            const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

            return {
                session,
                paymentIntent,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default StripeService;

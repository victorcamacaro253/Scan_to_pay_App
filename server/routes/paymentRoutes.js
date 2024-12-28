import { Router } from "express";
import PaymentController from "../controllers/paymentControllers.js";
const router = Router()

router.post('/payments',PaymentController.createPayment)

router.get('/payments/success', PaymentController.getPaymentById);


router.post('/payments/Paypal',PaymentController.createPaymentPaypal)

router.get('/paypal/capturePaymentPaypal',PaymentController.capturePaymentPaypal)





export default router

import { Router } from "express";
import paymentsController from "../controllers/payments.controller.js";

const router = Router();

router.post('/payment-intents',paymentsController.createPaymentIntent);
export default router;
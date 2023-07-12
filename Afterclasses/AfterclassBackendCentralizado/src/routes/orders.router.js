import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const router = Router();

router.get('/',ordersController.getOrders);
router.get('/:oid',ordersController.getOrderById);
router.post('/',ordersController.saveOrder);

export default router;
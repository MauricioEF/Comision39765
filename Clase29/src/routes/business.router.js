import { Router } from "express";
import businessController from "../controllers/business.controller.js";

const router = Router();

router.get('/',businessController.getBusiness);
router.get('/:bid',businessController.getBusinessById);
router.post('/',businessController.saveBusiness);


export default router;
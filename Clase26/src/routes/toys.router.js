import { Router } from "express";
import toysController from "../controllers/toys.controller.js";

const router = Router();

router.get('/',toysController.getToys);
router.post('/',toysController.saveToy);

export default router;
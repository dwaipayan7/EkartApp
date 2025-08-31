import { Router } from "express";
import OrderController from "../controller/order.controller.js";



const router = Router();

router.post("/", OrderController.createTransaction);

export default router;

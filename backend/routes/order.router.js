import { Router } from "express";
import OrderController from "../controller/order.controller.js";



const router = Router();

router.post("/transaction", OrderController.createTransaction);
router.post("/:userId", OrderController.getOrderByUserId);
router.post("/", OrderController.createOrder);

export default router;

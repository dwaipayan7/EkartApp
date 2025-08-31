import { Router } from "express";
import ProductController from "../controller/product.controller.js";


const router = Router();

router.get("/:category", ProductController.getProductByCategoryId);

export default router;

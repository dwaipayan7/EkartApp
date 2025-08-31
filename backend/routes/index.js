import { Router } from "express";
import UserRouter from "./user.router.js"
import CategoryRouter from "./category.router.js"
import ProductRouter from "./product.router.js"
import OrderRouter from "./order.router.js"

const router = Router();

router.use("/api/users", UserRouter)
router.use("/api/category", CategoryRouter)
router.use("/api/product", ProductRouter)
router.use("/api/order", OrderRouter)

export default router
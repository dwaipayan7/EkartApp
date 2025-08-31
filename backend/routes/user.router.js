import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();

router.get("/login", UserController.getUser);
router.post("/login", UserController.loginOrSignUp);

export default router;

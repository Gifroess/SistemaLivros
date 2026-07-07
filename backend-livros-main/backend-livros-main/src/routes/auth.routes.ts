import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authController = new AuthController();

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/create", authController.create);

export {router as authRoutes};
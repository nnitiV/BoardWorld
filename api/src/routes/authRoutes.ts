import { Router } from "express";
import * as authController from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.register);
authRoutes.post("/refresh", authController.refreshToken);
authRoutes.post("/logout", authController.logout);

export default authRoutes;
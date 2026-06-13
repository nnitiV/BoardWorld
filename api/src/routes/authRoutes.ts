import { Router } from "express";
import { login, refreshToken, register } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.post("/refresh", refreshToken);

export default authRoutes;
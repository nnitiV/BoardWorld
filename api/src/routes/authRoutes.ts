import { Router } from "express";
import { login, logout, refreshToken, register } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.post("/refresh", refreshToken);
authRoutes.post("/logout", logout);

export default authRoutes;
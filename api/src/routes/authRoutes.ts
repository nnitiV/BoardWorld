import { Router } from "express";
import { register } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/register", register);

export default authRoutes;
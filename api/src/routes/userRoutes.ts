import { Router } from "express";
import { getUserProfile } from "../controller/userController.js";

const userRoutes = Router();

userRoutes.get("/me", getUserProfile)

export default userRoutes;
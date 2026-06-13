import { Router } from "express";
import { getLoggedUser } from "../controller/userController.js";

const userRoutes = Router();

userRoutes.get("/me", getLoggedUser);

export default userRoutes;

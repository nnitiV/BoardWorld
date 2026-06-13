import { Router } from "express";
import { deleteUserById, getLoggedUserProfile } from "../controller/userController.js";

const userRoutes = Router();

userRoutes.get("/me", getLoggedUserProfile);
userRoutes.delete("/deleteMe", deleteUserById);

export default userRoutes;

import { Router } from "express";
import * as userController from "../controller/userController.js";

const userRoutes = Router();

userRoutes.get("/me", userController.getLoggedUserProfile);
userRoutes.delete("/deleteMe", userController.deleteUserById);


export default userRoutes;

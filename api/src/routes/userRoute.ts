import { Router } from "express";
import { deleteUserById, getLoggedUserProfile, testAdminRoute } from "../controller/userController.js";

const userRoutes = Router();

userRoutes.get("/me", getLoggedUserProfile);
userRoutes.get("/admin", testAdminRoute);
userRoutes.delete("/deleteMe", deleteUserById);


export default userRoutes;

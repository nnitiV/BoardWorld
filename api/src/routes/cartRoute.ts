import { Router } from "express";
import * as cartController from "../controller/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/", cartController.addToCart);

export default cartRoutes;

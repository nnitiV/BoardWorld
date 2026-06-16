import { Router } from "express";
import * as cartController from "../controller/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/", cartController.addToCart);
cartRoutes.put("/", cartController.updateCartItem);
cartRoutes.delete("/:id", cartController.deleteCartItem);

export default cartRoutes;

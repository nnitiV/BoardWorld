import { Router } from "express";
import * as cartController from "../controller/cartController.js";

const cartRoutes = Router();

cartRoutes.get("/", cartController.getCartByUserId);
cartRoutes.post("/", cartController.addToCart);
cartRoutes.post("/checkout", cartController.createCheckout);
cartRoutes.put("/", cartController.updateCartItem);
cartRoutes.delete("/:id", cartController.deleteCartItem);

export default cartRoutes;

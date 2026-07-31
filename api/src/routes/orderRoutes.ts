import { Router } from "express";
import * as orderController from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const orderRoutes = Router();

orderRoutes.post("/", protect, orderController.getOrders);
orderRoutes.post("/checkout", protect, orderController.createCheckout);
orderRoutes.delete("/cancel/:id", protect, orderController.cancelOrder);

export default orderRoutes;
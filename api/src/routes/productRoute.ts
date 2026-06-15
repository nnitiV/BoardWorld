import { Router } from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { Role } from "@prisma/client";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";
import {
  createProduct,
  updateProduct,
} from "../controller/productController.js";

const productRoutes = Router();

productRoutes.post(
  "/",
  protect,
  restrictTo(Role.ADMIN),
  uploadProductImage,
  createProduct,
);
productRoutes.put(
  "/:id",
  protect,
  restrictTo(Role.ADMIN),
  uploadProductImage,
  updateProduct,
);

export default productRoutes;

import { Router } from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { Role } from "@prisma/client";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";
import {
  createProduct,
  deactivateProduct,
  restoreProduct,
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
  "/restore/:id",
  protect,
  restrictTo(Role.ADMIN),
  restoreProduct,
);
productRoutes.put(
  "/:id",
  protect,
  restrictTo(Role.ADMIN),
  uploadProductImage,
  updateProduct,
);
productRoutes.delete(
  "/:id",
  protect,
  restrictTo(Role.ADMIN),
  deactivateProduct,
);

export default productRoutes;

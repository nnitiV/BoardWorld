import { Router } from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { Role } from "@prisma/client";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";
import * as productController from "../controller/productController.js";

const productRoutes = Router();

productRoutes.get("/catalog", productController.getProductCatalog);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post(
  "/",
  protect,
  restrictTo(Role.ADMIN),
  uploadProductImage,
  productController.createProduct,
);
productRoutes.put(
  "/restore/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.restoreProduct,
);
productRoutes.put(
  "/:id",
  protect,
  restrictTo(Role.ADMIN),
  uploadProductImage,
  productController.updateProduct,
);
productRoutes.delete(
  "/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.deactivateProduct,
);

export default productRoutes;

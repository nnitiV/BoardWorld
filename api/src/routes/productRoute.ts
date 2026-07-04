import { Router } from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { Role } from "@prisma/client";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";
import * as productController from "../controller/productController.js";

const productRoutes = Router();

productRoutes.get("/active", productController.getActiveProductCatalog);
productRoutes.get("/catalog", productController.getProductCatalog);
productRoutes.get("/categories", productController.getCategories);
productRoutes.get("/category/:id", productController.getCategoryById);
productRoutes.get("/reviews/product/:productId", productController.getReviewsByProductId);
productRoutes.get("/review/:id", productController.getReviewById);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post(
  "/",
  protect,
  restrictTo(Role.ADMIN),
  uploadProductImage,
  productController.createProduct,
);
productRoutes.post(
  "/category",
  protect,
  restrictTo(Role.ADMIN),
  productController.createCategory,
);
productRoutes.post(
  "/review",
  protect,
  restrictTo(Role.ADMIN),
  productController.createReview,
)
productRoutes.post(
  "/review",
  protect,
  restrictTo(Role.ADMIN),
  productController.createReview,
);
productRoutes.put(
  "/restore/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.restoreProduct,
);
productRoutes.put(
  "/category/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.updateCategory,
);
productRoutes.put(
  "/review/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.updateReview,
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
productRoutes.delete(
  "/category/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.deleteCategoryById,
);
productRoutes.delete(
  "/review/:id",
  protect,
  restrictTo(Role.ADMIN),
  productController.deleteReviewById,
);

export default productRoutes;

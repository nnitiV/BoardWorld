import { Request, Response } from "express";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import * as productService from "../services/productService.js";
import { CreateCategorySchema, CreateProductSchema, CreateReviewSchema, ProductCatalogRequestSchema, UpdateProductSchema } from "../types/product.types.js";
import fs from "fs/promises";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Prisma } from "@prisma/client";

export const getProductById =  async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(id.toString());
  res.status(200).json({
    message: "Product found.",
    product
  })
}

export const getProductByCategory = async (req: AuthRequest, res: Response) => {
  const { category } = req.params;
  const products = await productService.getProductByCategory(category);
  res.status(200).json({
    messaage: `Fetched products by category ${category}`,
    products
  })
}

export const getActivePopularProductCatalog = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page, limit } = ProductCatalogRequestSchema.parse(req.query);
    const { products } = await productService.getActivePopularProductCatalog(
      page,
      limit,
    );
    console.log("Here one");
    res.status(200).json({ message: "Product catalog retrieved.", products });
  },
);

export const getActiveProductCatalog = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page, limit } = ProductCatalogRequestSchema.parse(req.query);
    const { products, totalItems } = await productService.getProductCatalog(
      page,
      limit,
      true,
    );
    res
      .status(200)
      .json({
        message: "Product catalog retrieved.",
        products,
        totalItems,
      });
  },
);

export const getProductCatalog =  asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit } = ProductCatalogRequestSchema.parse(req.query);
  const {products, totalItems} = await productService.getProductCatalog(page, limit);
  res
    .status(200)
    .json({ message: "Product catalog retrieved.", products, totalItems });
});

export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, price, stock, description, categories } = CreateProductSchema.parse(req.body);
  
  if (!req.files || req.files.length === 0) {
    throw new AppError("Please provide at least one image for the product.", 400);
  }

  if (!Array.isArray(req.files)) {
    throw new AppError("Unexpected file upload format.", 400);
  }

  const imagesUrl = req.files.map((file) => `/${file.path.replace(/\\/g, "/")}`);

  const product = await productService.createNewProduct({
    name,
    price,
    stock,
    description,
    imagesUrl,
    categories,
  });

  res.status(201).json({
    message: "Product created.",
    product,
  });
});

export const getCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const categories = await productService.getCategories();
  return res.status(200).json({
    message: "Categories retrieved.",
    categories,
  });
});

export const getCategoryById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const category = await productService.getCategoryById(id);
  return res.status(200).json({
    message: "Category found.",
    category,
  });
});

export const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
   const { name } = CreateCategorySchema.parse(req.body);
    const category = await productService.createCategory(name);
    return res.status(201).json({
      message: "Category created.",
      category,
    });
});

export const updateCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const data = CreateCategorySchema.parse(req.body);
  const category = await productService.updateCategory(id, data);
  return res.status(200).json({
    message: "Category updated.",
    category,
  });
});

export const deleteCategoryById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await productService.deleteCategoryById(id);
  return res.status(200).json({
    message: "Category deleted.",
  });
});

export const getReviewsByProductId = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId } = req.params;
  const reviews = await productService.getReviewsByProductId(productId);
  console.log(reviews);
  return res.status(200).json({
    message: "Reviews retrieved.",
    reviews,
  });
});

export const getReviewById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const review = await productService.getReviewById(id);
  return res.status(200).json({
    message: "Review found.",
    review,
  });
});

export const createReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId } = req.params;
  const { rating, comment } = CreateReviewSchema.parse(req.body);
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError("User not authenticated.", 401);
  }

  try {
    const review = await productService.createReview(productId, userId, { rating, comment });
    
    return res.status(201).json({
      message: "Review created.",
      review,
    });
  } catch (error) {
    // Catch the P2002 Unique Constraint error elegantly
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new AppError("You have already reviewed this product.", 409); // 409 Conflict
    }
    throw error; // Let other unexpected errors propagate to your global handler
  }
});

export const updateReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new AppError("User context missing from request.", 401);
  }
  const { id } = req.params;
  const { rating, comment } = CreateReviewSchema.parse(req.body);
  const review = await productService.updateReview(id, userId, { rating, comment });
  return res.status(200).json({
    message: "Review updated.",
    review,
  });
});

export const deleteReviewById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await productService.deleteReviewById(id);
  return res.status(200).json({
    message: "Review deleted.",
  });
});

export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(id.toString());
  if(!product) {
    throw new AppError("Product not found.", 404);
  }

  const productData = UpdateProductSchema.parse(req.body);
  
  let imagesUrl = productData.imagesUrl;
  if ((!productData.imagesUrl || productData.imagesUrl.length <= 0)  && req.files && Array.isArray(req.files) && req.files.length > 0) {
    imagesUrl = req.files.map((file) => `/${file.path.replace(/\\/g, "/")}`);
  }
  if(!imagesUrl || imagesUrl.length === 0) {
    throw new AppError("Please provide at least one image for the product.", 400);
  }
  
  const wasUpdated = await productService.updateProduct(
    id.toString(),
    productData, 
    imagesUrl
  );

  if (wasUpdated && req.files && Array.isArray(req.files) && product) {
    await Promise.all(
      product.imagesUrl.map(async (url) => {
        await fs.unlink(`${process.cwd()}/${url}`).catch((err) => {
          if (err.code !== 'ENOENT') {
            console.error(`Failed to delete old image: ${url}`, err);
          }
        });
      })
    );
  }

  res.status(200).json({
    message: "Product updated.",
    data: {
      message: "Product updated successfully.",
      updatdeProduct: wasUpdated,
    },
  });
});

export const restoreProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const restoredProduct = await productService.restoreProduct(id.toString());
  res.status(200).json({
    message: "Product restored.",
    restoredProduct,
  });
};

export const deactivateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = await productService.deactivateProduct(id.toString());

  res.status(200).json({
    message: "Product deactivated.",
    updatedProduct,
  });
};

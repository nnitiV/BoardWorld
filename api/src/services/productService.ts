import * as productRepository from "../repository/productRepository.js";
import { CreateCategory, UpdateProduct } from "../types/product.types.js";
import { AppError } from "../utils/AppError.js";

export const getProductById = async (id: string) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new AppError("Couldn't find product.", 404);
  }
  return product;
};

export const getProductCatalog = async (page: number, limit: number, activeOnly?: boolean)  => {
  const skip = (page - 1) * limit;
  if(activeOnly) {
    const {products, totalItems} = await productRepository.getActiveProductCatalog(skip, limit);
    return {products, totalItems};
  }
  const {products, totalItems} = await productRepository.getProductCatalog(skip, limit);
  return {products, totalItems};
};

export const createNewProduct = async (productData: {
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: string;
  imagesUrl: string[];
}) => {
  const payload = {
    name: productData.name,
    price: productData.price,
    description: productData.description,
    imagesUrl: productData.imagesUrl,
    category: { connect: { id: productData.categoryId } },
    stock: productData.stock,
  };
  return await productRepository.createProduct(payload);
};

export const createCategory = async (categoryData: CreateCategory) => {
  return await productRepository.createCategory(categoryData);
};

export const updateCategory = async (id: string, categoryData: CreateCategory) => {
  const category = await productRepository.getCategoryById(id);
  if (!category) {
    throw new AppError("Couldn't find category.", 404);
  }
  return await productRepository.updateCategory(id, categoryData);
}

export const getCategories = async () => {
  return await productRepository.getCategories();
}

export const getCategoryById = async (id: string) => {
  const category = await productRepository.getCategoryById(id);
  if (!category) {
    throw new AppError("Couldn't find category.", 404);
  }
  return category;
}

export const deleteCategoryById = async (id: string) => {
  const category = await productRepository.getCategoryById(id);
  if (!category) {
    throw new AppError("Couldn't find category.", 404);
  }
  return await productRepository.deleteCategoryById(id);
}

export const getReviewById = async (id: string) => {
  const review = await productRepository.getReviewById(id);
  if (!review) {
    throw new AppError("Couldn't find review.", 404);
  }
  return review;
}

export const getReviewsByProductId = async (productId: string) => {
  return await productRepository.getReviewsByProductId(productId);
}

export const createReview = async (productId: string, userId: string, reviewData: { rating: number; comment: string | undefined }) => {
  return await productRepository.createReview({ ...reviewData, user: { connect: { id: userId } }, product: { connect: { id: productId } } });
};

export const updateReview = async (id: string, reviewData: { rating: number; comment: string | undefined }) => {
  const review = await getReviewById(id);
  if (!review) {
    throw new AppError("Couldn't find review.", 404);
  }
  return await productRepository.updateReview(id, reviewData);
}

export const deleteReviewById = async (id: string) => {
  const review = await getReviewById(id);
  if (!review) {
    throw new AppError("Couldn't find review.", 404);
  }
  return await productRepository.deleteReviewById(id);
}

export const updateProduct = async (id: string, productData: UpdateProduct, imagesUrl: string[]) => {
  const product = await getProductById(id);
  if (!product) {
    throw new AppError("Couldn't find product.", 404);
  }
  return await productRepository.updateProduct(id, productData, imagesUrl);
};

export const restoreProduct = async (id: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new AppError("Couldn't find product.", 404);
  }
  if (product.isActive) {
    return product;
  }
  return await productRepository.restoreProduct(id);
};

export const deactivateProduct = async (id: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new AppError("Couldn't find product.", 404);
  }
  if (!product.isActive) {
    return product;
  }
  return await productRepository.deactivateProduct(id);
};
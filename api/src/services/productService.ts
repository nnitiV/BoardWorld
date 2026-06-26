import * as productRepository from "../repository/productRepository.js";
import { UpdateProduct } from "../types/product.types.js";
import { AppError } from "../utils/AppError.js";

export const getProductById = async (id: string) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new AppError("Couldn't find product.", 404);
  }
  return product;
};

export const getProductCatalog = async (page: number, limit: number)  => {
  const skip = (page - 1) * limit;
  const {products, totalItems} = await productRepository.getProductCatalog(skip, limit);
  console.log("==== products =====", products)
  return {products, totalItems};
};

export const createNewProduct = async (productData: {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}) => {
  const payload = {
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
    stock: productData.stock,
  };
  return await productRepository.createProduct(payload);
};

export const updateProduct = async (id: string, productData: UpdateProduct, imageUrl: string) => {
  const product = await getProductById(id);
  if (!product) {
    throw new AppError("Couldn't find product.", 404);
  }
  return await productRepository.updateProduct(id, productData, imageUrl);
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

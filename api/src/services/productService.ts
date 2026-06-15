import * as productRepository from "../repository/productRepository.js";
import { UpdateProduct } from "../types/product.types.js";
import { AppError } from "../utils/AppError.js";

export const getProductById = async (id: string) => {
  return await productRepository.getProductById(id);
};

export const createNewProduct = async (productData: {
  name: string;
  price: string;
  imageUrl: string;
}) => {
  const parsedPrice = parseFloat(productData.price);
  const payload = {
    name: productData.name,
    price: parsedPrice,
    imageUrl: productData.imageUrl,
  };
  return await productRepository.createProduct(payload);
};

export const updateProduct = async (id: string, productData: UpdateProduct) => {
  return await productRepository.updateProduct(id, productData);
};

export const restoreProduct = async (id: string) => {
  return await productRepository.restoreProduct(id);
}

export const deactivateProduct = async (id: string) => {
  return await productRepository.deactivateProduct(id);
};

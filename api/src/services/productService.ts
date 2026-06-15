import * as productRepository from "../repository/productRepository.js";

export const createNewProduct = async (productData: {
  name: string;
  price: string; // Comes in as string from form-data
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

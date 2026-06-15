import { Request, Response } from "express";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import * as productService from "../services/productService.js";
import { UpdateProductSchema } from "../types/product.types.js";
import fs from "fs/promises";

export const createProduct = async (req: AuthRequest, res: Response) => {
  const { name, price } = req.body;

  if (!req.file) {
    throw new AppError("Please provide an image for the product.", 400);
  }

  const imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;

  const product = await productService.createNewProduct({
    name,
    price,
    imageUrl,
  });

  res.status(201).json({
    status: "success",
    data: { product },
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(id.toString());
  if (req.file && product) {
    await fs.unlink(`${process.cwd()}/${product?.imageUrl}`);
  }
  const productData = UpdateProductSchema.parse(req.body);
  const wasUpdated = await productService.updateProduct(
    id.toString(),
    productData,
  );

  res.status(200).json({
    status: "success",
    data: {
      message: "Product updated successfully.",
      updateProduct: wasUpdated,
    },
  });
};

export const restoreProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const restoredProduct = await productService.restoreProduct(id.toString());
  res.status(200).json({
    message: "Product restored.",
    restoredProduct
  })
}

export const deactivateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = await productService.deactivateProduct(
    id.toString(),
  );

  res.status(200).json({
    message: "Status updated.",
    updatedProduct,
  });
};

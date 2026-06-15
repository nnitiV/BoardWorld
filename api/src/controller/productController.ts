import { Response } from "express";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import * as productService from "../services/productService.js";

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

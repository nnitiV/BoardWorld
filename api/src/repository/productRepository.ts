import { Prisma } from "@prisma/client";
import { prisma } from "../config/db.js";
import { UpdateProduct } from "../types/product.types.js";

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const getProductCatalog = async (
  skip: number,
  limit: number,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return {
    products: await client.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imagesUrl: true,
        price: true,
        stock: true,
        isActive: true,
        category: {
          select: {
            id: true,
            name: true, // Pull only the fields your frontend actually needs
          }
        }
      },
      take: limit,
      skip: skip,
    }),
    totalItems: await client.product.count(),
  };
};

export const getActiveProductCatalog = async (
  skip: number,
  limit: number,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return {
    products: await client.product.findMany({
      where: {
        isActive: true,
        stock: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
        imagesUrl: true,
        price: true,
        stock: true,
        isActive: true,
      },
      take: limit,
      skip: skip,
    }),
    totalItems: await client.product.count({
      where: { isActive: true, stock: {
        gt: 0,
      }}
    }),
  };
};

export const createProduct = async (
  data: Prisma.ProductCreateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.create({
    data: {
      ...data,
      stock: data.stock,
    },
  });
};

export const getCategories = async (tx?: Prisma.TransactionClient) => {
  const client = tx || prisma;
  return await client.category.findMany();
}

export const getCategoryById = async (id: string, tx?: Prisma.TransactionClient) => {
  const client = tx || prisma;
  return await client.category.findUnique({ where: { id } });
}

export const createCategory = async (
  data: Prisma.CategoryCreateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.category.create({
    data: {
      ...data,
    },
  });
};

export const updateCategory = async (
  id: string,
  data: Prisma.CategoryUpdateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.category.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const deleteCategoryById = async (
  id: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.category.delete({
    where: { id },
  });
};

export const getReviewById = async (id: string, tx?: Prisma.TransactionClient) => {
  const client = tx || prisma;
  return await client.review.findUnique({ where: { id } });
}

export const getReviewsByProductId = async (productId: string, tx?: Prisma.TransactionClient) => {
  const client = tx || prisma;
  return await client.review.findMany({ where: { productId } });
}

export const createReview = async (
  data: Prisma.ReviewCreateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.review.create({
    data: {
      ...data,
    },
  });
};

export const updateReview = async (
  id: string,
  data: Prisma.ReviewUpdateInput,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.review.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const deleteReviewById = async (
  id: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.review.delete({
    where: { id },
  });
};

export const updateProduct = async (
  id: string,
  data: UpdateProduct,
  imagesUrl: string[],
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data: {
      ...data,
      imagesUrl: imagesUrl,
    },
  });
};

export const restoreProduct = async (
  id: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data: { isActive: true },
  });
};

export const deactivateProduct = async (
  id: string,
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.product.update({
    where: { id },
    data: { isActive: false },
  });
};

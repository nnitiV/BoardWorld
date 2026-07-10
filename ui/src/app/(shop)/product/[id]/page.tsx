"use client";
import ProductShowcase from "@/components/product/ProductShowcase";
import { useGetProductByIdQuery } from "@/hooks/useProductMutation";
import { Product } from "@/types/product.type";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const { data } = useGetProductByIdQuery(id as string);
  const product = data?.product as Product;
  return (
    <>
      {product && (
        <div className="h-dvh w-3/4 mx-auto mt-4 shadow-lg rounded-lg border border-slate-200 bg-slate-100 p-6 overflow-hidden">
          <ProductShowcase product={product} />
        </div>
      )}
    </>
  );
}

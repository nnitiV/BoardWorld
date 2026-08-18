"use client";
import ProductShowcase from "@/components/product/ProductShowcase";
import ReviewSection from "@/components/product/ReviewSection";
import { useGetProductByIdQuery } from "@/hooks/useProductMutation";
import { Product } from "@/types/product.type";
import { useParams, useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const { data } = useGetProductByIdQuery(id as string);
  const router = useRouter();
  const product = data?.product as Product;
  if(product && !product.isActive) {
    router.push('/404');
  }
  return (
    <>
      {product && product.isActive && (
        <div className="h-fit w-full max-w-7xl mx-auto mt-4 sm:mt-8 shadow-lg rounded-2xl border border-slate-200 bg-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden">
  <ProductShowcase product={product} />
  <ReviewSection className="mt-12" productId={product.id} />
</div>
      )}
    </>
  );
}

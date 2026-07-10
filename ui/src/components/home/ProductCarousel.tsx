"use client";
import { useGetProductCatalogQuery } from "@/hooks/useProductMutation";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { useState } from "react";

interface ProductCarouselProps {
  className?: string;
  amountToShow: number;
  productsToShow?: Product[];
  title: string;
}

export default function ProductCarousel({ className, amountToShow, productsToShow, title }: ProductCarouselProps) {
  const { data } = useGetProductCatalogQuery(1, 20, true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const products = productsToShow?.slice(0, 20) || data?.productCatalog || [];
  const totalPages = Math.ceil(products.length / amountToShow);

  const nextProduct = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevProduct = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + totalPages) % totalPages,
    );
  };

  return (
    <div
      className={`w-3/4 rounded-2xl p-6 py-8 bg-white border border-slate-700/15 mx-auto ${className}`}
    >
      <h1 className="text-2xl text-slate-950 font-bold">
        {title}
      </h1>
      <div className="relative group mx-auto h-75 w-full overflow-hidden rounded-xl aspect-square">
        <div
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          className="flex h-full w-full transition-transform duration-500 ease-in-out z-0"
        >
          {products.map((product, index) => (
            <div
              style={{ width: `${100 / amountToShow}%` }}
              className={`h-full relative shrink-0 flex flex-col justify-between cursor-pointer p-2 rounded-2xl
                hover:bg-slate-300/50`}
              onClick={() => (window.location.href = `/product/${product.id}`)}
              key={index}
            >
              <div className="h-3/4 bg-slate-300/50 rounded-2xl">
                <Image
                  src={`http://localhost:5173${product.imagesUrl[0]}`}
                  alt={`${product.imagesUrl[0]} - Image ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-contain h-full"
                  priority={index === 0}
                />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-semibold text-slate-900">
                  {product.name}
                </h2>
                <p className="text-xs md:text-sm font-medium text-blue-600">
                  Price: ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        {products.length / amountToShow > 1 && (
          <>
            <button
              className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 
              p-2 rounded-full shadow-md transition-all md:opacity-0 md:group-hover:opacity-100 z-15"
              onClick={prevProduct}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-red-500
               text-slate-800 p-2 rounded-full shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 
               z-10"
              onClick={nextProduct}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}


"use client";
import { useGetProductCatalogQuery } from "@/hooks/useProductMutation";
import { Product } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductCarouselProps {
  className?: string;
  amountToShowInPage: number;
  productsToShow?: Product[];
  title: string;
}

export default function ProductCarousel({ className, amountToShowInPage, productsToShow, title }: ProductCarouselProps) {
  const API_URL = process.env.API_URL || "http://localhost:5173";
  const { data } = useGetProductCatalogQuery(1, 20, true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const products = productsToShow?.slice(0, 20) || data?.products || [];
  const totalPages = Math.ceil(products.length / amountToShowInPage);
  const [amountToShow, setAmountToShow] = useState(amountToShowInPage);

  useEffect(() => {
  const handleResize = () => {if (window.innerWidth < 1024) {
      setAmountToShow(3); 
    }
  };

  // Run once on mount to set the initial size correctly
  handleResize();

  // Add event listener to update if the user rotates their phone or resizes the window
  window.addEventListener('resize', handleResize);
  
  // Cleanup listener on unmount to prevent memory leaks
  return () => window.removeEventListener('resize', handleResize);
}, []);

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
      // Mobile: full width. Tablet: slightly contained. Desktop: 3/4 width.
      className={`w-full px-4 md:px-6 lg:w-3/4 mx-auto rounded-2xl py-8 bg-white border border-slate-700/15 ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl text-slate-950 font-bold">
          {title}
        </h1>
        <Link href="/allProducts" className="text-sm md:text-base text-slate-950 font-bold hover:text-blue-600 transition-colors">
          See all products -&gt;
        </Link>
      </div>

      {/* Removed the invalid h-75, let the aspect-square or content dictate height */}
      <div className="relative group mx-auto w-full overflow-hidden rounded-xl">
        <div
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          className="flex transition-transform duration-500 ease-in-out z-0"
        >
          {products.map((product, index) => (
            /* Wrapped in a Link for proper SPA routing and SEO */
            <Link
              href={`/product/${product.id}`}
              style={{ width: `${100 / amountToShow}%` }}
              className="relative shrink-0 flex flex-col justify-between p-2 rounded-2xl hover:bg-slate-100 transition-colors group/card"
              key={product.id || index}
            >
              <div className="aspect-square w-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden mb-3">
                <Image
                  src={`${API_URL}${product.imagesUrl[0]}`}
                  alt={`${product.name} - Image`}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full group-hover/card:scale-105 transition-transform duration-300"
                  priority={index === 0}
                />
              </div>
              <div className="px-1">
                <h2 className="text-sm md:text-base font-semibold text-slate-900 truncate">
                  {product.name}
                </h2>
                <p className="text-xs md:text-sm font-medium text-blue-600 mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {products.length / amountToShow > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
              onClick={prevProduct}
              aria-label="Previous products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              // Fixed the weird red hover to match the previous button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
              onClick={nextProduct}
              aria-label="Next products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}


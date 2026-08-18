"use client";

import {  useGetProductsByCategory } from "@/hooks/useProductMutation";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AllProductsByCategory() {
  const [amount, setAmount] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
    const params = useParams();
  const category = params.category;
  const { data, isLoading } = useGetProductsByCategory(category?.toString() || "Animals");
  const products = data?.products || [];
  const totalItems = products.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / amount));
  const API_URL = process.env.API_URL || "http://localhost:5173";
  return (
    <div className="w-full max-w-7xl mx-auto mt-4 sm:mt-8 shadow-lg rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 overflow-hidden">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-950 px-2">
          All Products
        </h1>
        
        <div className="relative inline-block w-full sm:w-24 shrink-0">
          <select
            name="amount"
            id="amount"
            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-4">
        {isLoading ? (
          <li className="flex justify-center py-12 col-span-full" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-slate-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </li>
        ) : (
          products.map((product) => (
            <li key={product.id} className="relative group flex w-full">
              <Link
                href={`/product/${product.id}`}
                // THE FIX: flex-row on mobile, flex-col on tablet/desktop
                className="w-full flex flex-row sm:flex-col items-center sm:items-start gap-4 p-3 sm:p-4 rounded-xl transition-all cursor-pointer bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-slate-100 shadow-sm hover:shadow-md overflow-hidden"
              >
                {/* THE FIX: Fixed 112px square on mobile, expands to 100% width on desktop */}
                <div className="w-28 h-28 sm:w-full sm:h-auto sm:aspect-square shrink-0 relative bg-white rounded-lg overflow-hidden border border-slate-200">
                  <Image
                    src={`${API_URL}${product.imagesUrl[0]}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col justify-center sm:justify-start h-full sm:w-full overflow-hidden flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 break-words">
                    {product.name}
                  </h2>
                  <div className="flex flex-col mt-1 sm:mt-2 gap-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-2 leading-tight break-words">
                      <span className="font-bold text-slate-800">Categories:</span><br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>
                      {product.categories?.map((category) => category.name).join(", ")}
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-blue-600 mt-1">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-8 w-full border-t border-slate-100 pt-6">
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
          className="px-3 py-2 sm:px-4 transition-all rounded-lg cursor-pointer hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600 font-bold"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
          if (
            pageNumber === page ||
            pageNumber === page + 1 ||
            pageNumber === page - 1 ||
            pageNumber === 1 ||
            pageNumber === totalPages
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all rounded-lg font-medium text-sm sm:text-base ${
                  pageNumber === page
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "cursor-pointer text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === 2 && page > 3) {
            return (
              <button
                key={pageNumber}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-400 hover:bg-slate-100"
                onClick={() => setPage((page) => Math.max(1, page - 5))}
                title="Jump back 5 pages"
              >
                ...
              </button>
            );
          } else if (pageNumber === totalPages - 1 && page < totalPages - 2) {
            return (
              <button
                key={pageNumber}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-400 hover:bg-slate-100"
                onClick={() => setPage((page) => Math.min(totalPages, page + 5))}
                title="Jump forward 5 pages"
              >
                ...
              </button>
            );
          }
          return null;
        })}

        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={page === totalPages}
          className="px-3 py-2 sm:px-4 transition-all cursor-pointer rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600 font-bold"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

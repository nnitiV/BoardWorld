"use client";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { useState } from "react";
import Button from "../admin/Button";
import ImageCarousel from "./ImageCarousel";

interface ProductShowcaseProps {
  product: Product;
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="flex justify-between gap-12 w-full">
      <div className="w-3/5 flex flex-col gap-6">
        <ImageCarousel
          src={product.imagesUrl}
          alt={product.name.toString()}
        />
      </div>

      <main className="w-2/5 pt-8 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-slate-800 font-bold">{product.name}</h1>
          <p className="text-slate-700/85 font-bold">$ {product.price}</p>
          <p className="text-slate-900 text-sm font-bold my-2">{product.description}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p
            className={`-mb-2 text-base font-bold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {product.stock > 0 ? `In Stock` : "Out of Stock"}
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-xl text-slate-800">Quantity:</p>
            <div className="relative inline-block w-full">
              <select
                name="amount"
                id="amount"
                className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg 
                cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2
                focus:ring-blue-500/20 focus:border-blue-500"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
              >
                {Array.from(
                  { length: product.stock },
                  (_, index) => index + 1,
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button>Purchase now</Button>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

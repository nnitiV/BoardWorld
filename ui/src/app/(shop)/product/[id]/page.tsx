"use client";
import Button from "@/components/admin/Button";
import { useGetProductByIdQuery } from "@/hooks/useProductMutation";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const [amount, setAmount] = useState<number>(1);
  const { data } = useGetProductByIdQuery(id as string);
  const product = (data?.product as Product) || null;
  return (
    <>
      {product && (
        <div className="h-dvh w-3/4 mx-auto mt-4 shadow-lg rounded-lg border border-slate-200 bg-slate-100 p-6 overflow-hidden">
          <div className="flex justify-between gap-12 w-full">
            <div className="w-3/5 flex flex-col gap-6">
              <div className="w-120 h-100 mx-auto relative flex shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={`http://localhost:5173${product.imageUrl}`}
                  alt={product.name.toString()}
                  className="object-fill"
                  width={900}
                  height={900}
                />
              </div>
              <div className="w-full flex gap-6 overflow-auto scrollbar-none">
                {Array.from({ length: 12 }, (_, index) => index + 1).map(
                  (num) => (
                    <div className="w-30 h-30 relative shrink-0 rounded-lg overflow-hidden transition-all hover:cursor-pointer hover:opacity-50" key={num}>
                      <Image
                        src={`http://localhost:5173${product.imageUrl}`}
                        alt={product.name.toString()}
                        className="object-fill"
                        width={900}
                        height={900}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            <main className="w-2/5 p-4 py-6 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-slate-800">{product.name}</h1>
                <p className="text-gray-600">$ {product.price}</p>
              </div>
              <div className="flex flex-col gap-5">
                <p
                  className={`font-bold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {product.stock > 0 ? `In Stock` : "Out of Stock"}
                </p>
                <div>
                  <p>Quantity:</p>
                  <div className="relative inline-block w-full">
                    <select
                      name="amount"
                      id="amount"
                      className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={amount}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                        setAmount(1);
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
                <div className="flex gap-4">
                  <Button>Purchase now</Button>
                  <Button>Add to Cart</Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

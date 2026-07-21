"use client";
import { Product } from "@/types/product.type";
import { useState } from "react";
import Button from "../admin/Button";
import ImageCarousel from "./ImageCarousel";
import { useRouter } from "next/navigation";
import { useAddItemToCartMutation } from "@/hooks/useCartMutation";

interface ProductShowcaseProps {
  product: Product;
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  const { mutate: addCartItem} = useAddItemToCartMutation();
  const [amount, setAmount] = useState<number>(1);
  const router = useRouter();
  // 1. Defensive checking: is it in stock?
  const isOutOfStock = product.stock <= 0;

  // 2. Performance protection: Cap the dropdown to prevent DOM crashing
  const maxPurchaseQuantity = Math.min(product.stock, 10);

  const addCartItemToCart = () => {
    addCartItem({ productId: product.id, quantity: amount });
  }

  return (
    // 3. Mobile-first stacking (flex-col) to side-by-side (md:flex-row)
    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 w-full md:max-w-7xl mx-auto px-0 md:px-0">
      {/* 4. Fluid widths instead of hardcoded fractions on mobile */}
      <div className="w-full md:w-3/5 mx-auto flex flex-col">
        <ImageCarousel src={product.imagesUrl} alt={product.name.toString()} />
      </div>

      {/* 5. Semantic HTML: Changed <main> to <section> */}
      <section className="w-full md:w-1/2 flex flex-col justify-start md:my-auto gap-6 md:gap-32">
        {" "}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold leading-tight">
            {product.name}
          </h1>
          {/* 6. Professional currency formatting */}
          <p className="text-xl text-blue-600 font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </p>
          <div className="flex flex-col md:flex-row mt-2 gap-5">
            {product.categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => router.push(`/category/${category.name}`)}
                className={`px-4 py-2 w-fit rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/10 scale-102`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <p
            className={`text-base font-bold ${!isOutOfStock ? "text-green-600" : "text-red-600"}`}
          >
            {!isOutOfStock ? "In Stock" : "Out of Stock"}
          </p>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-base font-semibold text-slate-800"
            >
              Quantity:
            </label>
            <div className="relative inline-block w-full md:w-1/2">
              <select
                name="amount"
                id="amount"
                disabled={isOutOfStock}
                className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-3 pr-8 rounded-lg cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              >
                {!isOutOfStock ? (
                  Array.from(
                    { length: maxPurchaseQuantity },
                    (_, index) => index + 1,
                  ).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))
                ) : (
                  <option value={0}>0</option>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 7. Action buttons dynamically disabled based on stock */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4">
            <Button
              variant="primary"
              className="cursor-pointer"
              disabled={isOutOfStock}
            >
              Purchase now
            </Button>
            <Button
              variant="secondary"
              className="cursor-pointer"
              disabled={isOutOfStock}
              onClick={addCartItemToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

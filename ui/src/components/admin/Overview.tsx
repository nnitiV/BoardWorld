import { useGetProductCatalogMutation } from "@/hooks/useProductMutation";
import Image from "next/image";
import { useState } from "react";

export default function Overview() {
  const [amount, setAmount] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetProductCatalogMutation(page, amount);
  const products = data?.productCatalog || [];
  const totalItems = data?.totalItems || 0;
const totalPages = Math.max(1, Math.ceil(totalItems / amount));
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-blue-950">Products Overview</h1>
      <div className="relative inline-block w-20">
        <select
          name="amount"
          id="amount"
          className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      <ul className="flex flex-col gap-6 w-full max-w-2xl">
        {isLoading ? (
          <li className="flex justify-center py-6" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
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
            <li
              key={product.id}
              className="w-full flex items-center gap-6 p-3 rounded-xl transition-all cursor-pointer hover:bg-slate-50 border border-transparent hover:border-slate-100"
            >
              <div className="w-24 h-24 relative flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                <Image
                  src={`http://localhost:5173${product.imageUrl}`}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h2>
                <p className="text-sm font-medium text-blue-600">
                  ${product.price}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="flex items-center gap-1 mt-6">
        <button
          onClick={() => setPage(page => page - 1)}
          disabled={page === 1}
          className="px-4 py-2 transition-all rounded-l-lg cursor-pointer hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-10 h-10 flex items-center justify-center transition-all rounded-lg font-medium
        ${
          n === page
            ? "bg-blue-600 text-white shadow-md" // Active state
            : " cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900" // Inactive state
        }`}
            >
              {n}
            </button>
          ),
        )}

        <button
          onClick={() => setPage(page => page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 transition-all cursor-pointer rounded-r-lg hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

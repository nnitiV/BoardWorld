import {
  useDeactivateProductMutation,
  useGetProductCatalogQuery,
  useRestoreProductMutation,
} from "@/hooks/useProductMutation";
import Image from "next/image";
import { useState } from "react";
import { default as EditProductModal} from "./EditProduct";
import { EditProduct } from "@/types/product.type";
import Button from "./Button";
import AddProduct from "./AddProduct";
import LoadingIcon from "../Icons/LoadingIcon";
import EditIcon from "../Icons/EditIcon";
import TrashIcon from "../Icons/TrashIcon";
import RestoreIcon from "../Icons/RestoreIcon";
import EmptyProductState from "../product/EmptyProductState";
import AddCategory from "./AddCategory";
import EditCategoriesModal from "./EditCategoriesModal";

export default function Overview() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5173";
  
  const [amount, setAmount] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const [updateProduct, setUpdateProduct] = useState<EditProduct | null>(null);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [showEditCategories, setShowEditCategories] = useState<boolean>(false);
  
  const { data, isLoading } = useGetProductCatalogQuery(page, amount);
  const { mutate: deleteProduct } = useDeactivateProductMutation();
  const { mutate: restoreProduct } = useRestoreProductMutation();
  
  const products = data?.products || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / amount));

  const setProductToUpdate = (index: number) => {
    const product = products[index];
    const productToUpdate: EditProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      categories: product.categories.map((category) => category.id),
      totalRating: product.totalRating,
      price: product.price,
      isActive: product.isActive,
      stock: product.stock,
      imagesUrl: product.imagesUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
    setUpdateProduct(productToUpdate);
  }

  return (
    <>
      {/* 1. Main Container: Removed fixed percentages. Used max-w-7xl for a standard, beautiful ultra-wide limit, scaling down naturally on mobile. */}
      <div className="w-full max-w-7xl mx-auto mt-4 shadow-lg rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* 2. Header & Controls: Stack on mobile, row on tablet/desktop. */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Products Overview
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <div className="relative inline-block w-full sm:w-24 shrink-0">
              <select
                name="amount"
                id="amount"
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="15">15</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* 3. Buttons: Grid on mobile so they stack cleanly, row on desktop. */}
            <div className="grid grid-cols-1 sm:flex sm:flex-row flex-wrap gap-3 w-full md:w-auto">
              <Button
                className="w-full sm:w-auto m-0 cursor-pointer"
                onClick={() => setShowEditCategories(true)}
              >
                Edit Categories
              </Button>
              <Button
                className="w-full sm:w-auto m-0 cursor-pointer"
                onClick={() => setShowAddCategory(true)}
              >
                Add Category (+)
              </Button>
              <Button
                className="w-full sm:w-auto m-0 cursor-pointer bg-blue-700 hover:bg-blue-800"
                onClick={() => setShowAddProduct(true)}
              >
                Add Product (+)
              </Button>
            </div>
          </div>
        </div>

        {products.length <= 0 ? (
          <EmptyProductState onAddProduct={() => setShowAddProduct(true)} />
        ) : (
          /* 4. Product Grid: 1 col on mobile, 2 on tablet, 3 on large screens. */
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full">
            {isLoading ? (
              <li
                className="flex justify-center py-12 col-span-1 md:col-span-2 xl:col-span-3"
                role="status"
              >
                <LoadingIcon />
              </li>
            ) : (
              products.map((product, index) => (
                <li key={product.id} className="relative group flex">
                  {/* Semantic HTML: The entire card is a button for accessibility */}
                  <button
                    onClick={() => setProductToUpdate(index)}
                    className="w-full flex flex-row items-center text-left gap-4 rounded-xl transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 p-3 shadow-sm"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 bg-white rounded-lg overflow-hidden border border-slate-200">
                      <Image
                        src={`${API_URL}${product.imagesUrl[0]}`}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 96px, 112px"
                        loading="lazy"
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex flex-col justify-center flex-1 h-full py-1 overflow-hidden">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate pr-8">
                        {product.name}
                      </h2>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs sm:text-sm font-semibold text-slate-700">
                          ${product.price}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {product.categories.map((c) => c.name).join(", ")}
                        </p>
                        <p className="text-xs text-slate-500">
                          Stock:{" "}
                          <span className="font-medium text-slate-700">
                            {product.stock}
                          </span>
                        </p>
                        <p
                          className={`text-xs font-bold mt-1 ${product.isActive ? "text-emerald-600" : "text-rose-600"}`}
                        >
                          {product.isActive ? "● Active" : "○ Inactive"}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Absolute positioned action buttons */}
                  <div className="absolute right-3 top-3 flex flex-col gap-2">
                    <button
                      className="p-1.5 bg-white/80 hover:bg-white rounded-md shadow-sm border border-slate-200 transition-colors"
                      aria-label="Edit Product"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProductToUpdate(index);
                      }}
                    >
                      <EditIcon className="w-5 h-5 text-slate-600" />
                    </button>
                    {product.isActive ? (
                      <button
                        className="p-1.5 bg-white/80 hover:bg-rose-50 rounded-md shadow-sm border border-slate-200 transition-colors group/trash"
                        aria-label="Deactivate Product"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                      >
                        <TrashIcon className="w-5 h-5 text-rose-500 group-hover/trash:text-rose-700" />
                      </button>
                    ) : (
                      <button
                        className="p-1.5 bg-white/80 hover:bg-emerald-50 rounded-md shadow-sm border border-slate-200 transition-colors group/restore"
                        aria-label="Restore Product"
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreProduct(product.id);
                        }}
                      >
                        <RestoreIcon className="w-5 h-5 text-emerald-500 group-hover/restore:text-emerald-700" />
                      </button>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}

        {/* 5. Pagination: Wrapped items and changed <p> to <button> or <span> for semantics. */}
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-8 w-full border-t border-slate-100 pt-6">
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1}
            className="px-3 py-2 sm:px-4 transition-all rounded-lg cursor-pointer hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600 font-bold"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => {
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
              } else if (
                pageNumber === totalPages - 1 &&
                page < totalPages - 2
              ) {
                return (
                  <button
                    key={pageNumber}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-400 hover:bg-slate-100"
                    onClick={() =>
                      setPage((page) => Math.min(totalPages, page + 5))
                    }
                    title="Jump forward 5 pages"
                  >
                    ...
                  </button>
                );
              }
              return null;
            },
          )}

          <button
            onClick={() => setPage((page) => page + 1)}
            disabled={page === totalPages}
            className="px-3 py-2 sm:px-4 transition-all cursor-pointer rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600 font-bold"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modals remain exactly as you had them */}
      {updateProduct && (
        <EditProductModal
          editProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
        />
      )}
      {showEditCategories && (
        <EditCategoriesModal setShowEditCategories={setShowEditCategories} />
      )}
      {showAddProduct && (
        <AddProduct setShowAddProduct={() => setShowAddProduct(false)} />
      )}
      {showAddCategory && (
        <AddCategory setShowAddCategory={() => setShowAddCategory(false)} />
      )}
    </>
  );
}
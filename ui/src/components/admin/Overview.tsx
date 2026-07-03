import {
  useDeactivateProductMutation,
  useGetProductCatalogQuery,
  useRestoreProductMutation,
} from "@/hooks/useProductMutation";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import { Product } from "@/types/product.type";
import Button from "./Button";
import AddProduct from "./AddProduct";
import LoadingIcon from "../Icons/LoadingIcon";
import EditIcon from "../Icons/EditIcon";
import TrashIcon from "../Icons/TrashIcon";
import RestoreIcon from "../Icons/RestoreIcon";
import EmptyProductState from "../product/EmptyProductState";

export default function Overview() {
  const [amount, setAmount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [updateProduct, setUpdateProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const { data, isLoading } = useGetProductCatalogQuery(page, amount);
  const { mutate: deleteProduct } = useDeactivateProductMutation();
  const { mutate: restoreProduct } = useRestoreProductMutation();
  const   products = data?.productCatalog || []
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / amount));
  return (
    <>
      <div className="w-3/4 mx-auto mt-4 shadow-lg rounded-lg border border-slate-200 bg-slate-100 p-6 overflow-hidden">
        <h1 className="text-2xl text-blue-950">Products Overview</h1>
        <div className="flex justify-between items-center pe-12">
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
          <Button
            className="w-fit! m-0!"
            onClick={() => setShowAddProduct(true)}
          >
            Add Product (+)
          </Button>
        </div>
        {products.length <= 0 ?
              <EmptyProductState onAddProduct={() => setShowAddProduct(true)} />
            :
        <ul className="flex flex-col md:grid md:grid-cols-3 gap-6 w-full pe-12 py-6">
          {isLoading ? (
            <li className="flex justify-center py-6 col-span-3" role="status">
              <LoadingIcon />
            </li>
          ) : (
            products.map((product, index) => {
              console.log(product);
              return (
              <li
              key={product.id}
              onClick={() => setUpdateProduct(products[index])}
              className="w-full flex items-center relative gap-6 rounded-xl transition-all cursor-pointer
              hover:bg-slate-50 border border-transparent hover:border-slate-100"
              >
                <div className="w-24 h-24 relative shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                  <Image
                    src={`http://localhost:5173${product.imagesUrl[0]}`}
                    alt={product.name}
                    width={96}
                    height={96}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between h-full p-0">
                  <h2 className="text-lg font-semibold text-slate-900">
                  {product.name}
                  </h2>
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      ${product.price}
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      Stock {product.stock}
                    </p>
                    <p
                      className={`text-sm font-medium ${product.isActive ? "text-green-600" : "text-red-600"}`}
                      >
                      {product.isActive ? "Product Active" : "Product Inactive"}
                    </p>
                  </div>
                </div>

                <EditIcon className="w-7 h-7 absolute top-0 right-0" />
                {product.isActive ? (
                  <TrashIcon
                  className="w-7 h-7 absolute bottom-0 right-0 fill-red-600"
                  onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                  />
                ) : (
                  <RestoreIcon
                  className="w-7 h-7 absolute bottom-0 right-0 fill-green-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    restoreProduct(product.id);
                  }}
                  />
                )}
              </li>
            );
          }))}
        </ul>
        }
        <div className="flex items-center gap-1 mt-6 mx-auto">
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1}
            className="px-4 py-2 transition-all rounded-l-lg cursor-pointer hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => {
              if (
                pageNumber == page ||
                pageNumber == page + 1 ||
                pageNumber == page - 1 ||
                pageNumber == 1 ||
                pageNumber == totalPages
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center transition-all rounded-lg font-medium
        ${
          pageNumber === page
            ? "bg-blue-600 text-white shadow-md" // Active state
            : "cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900" // Inactive state
        }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (pageNumber == 2 && page > 3) {
                return (
                  <p
                    key={pageNumber}
                    className="w-10 h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900"
                    onClick={() => setPage((page) => Math.max(1, page - 5))}
                  >
                    ...
                  </p>
                );
              } else if (
                pageNumber == totalPages - 1 &&
                page < totalPages - 2
              ) {
                return (
                  <p
                    key={pageNumber}
                    className="w-10 h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900"
                    onClick={() =>
                      setPage((page) => Math.min(totalPages, page + 5))
                    }
                  >
                    ...
                  </p>
                );
              }
            },
          )}

          <button
            onClick={() => setPage((page) => page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 transition-all cursor-pointer rounded-r-lg hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600"
          >
            &gt;
          </button>
        </div>
      </div>
      {updateProduct && (
        <EditProduct
          editProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
        />
      )}
      {showAddProduct && (
        <AddProduct setShowAddProduct={() => setShowAddProduct(false)} />
      )}
    </>
  );
}

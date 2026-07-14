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
  const [amount, setAmount] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const [updateProduct, setUpdateProduct] = useState<EditProduct | null>(null);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [showEditCategories, setShowEditCategories] = useState<boolean>(false);
  
  const { data, isLoading } = useGetProductCatalogQuery(page, amount);
  const { mutate: deleteProduct } = useDeactivateProductMutation();
  const { mutate: restoreProduct } = useRestoreProductMutation();
  
  const products = data?.productCatalog || [];
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
      {/* 1. Main Container: Fluid width on mobile, max-width on desktop. Reduced padding on mobile. */}
      <div className="w-[95%] md:w-11/12 lg:w-3/4 mx-auto mt-4 shadow-lg rounded-lg border border-slate-200 bg-slate-100 p-4 md:p-6 overflow-hidden">
        <h1 className="text-xl md:text-2xl text-blue-950 mb-4 md:mb-0">Products Overview</h1>
        
        {/* 2. Header & Controls: Stack on mobile, flex-row on desktop. Adjusted padding-end. */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:pe-12">
          
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
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="15">15</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* 3. Buttons: Added flex-wrap so they don't break the layout on smaller screens. */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button
              className="w-fit! m-0! cursor-pointer"
              onClick={() => setShowEditCategories(true)}
            >
              Edit Categories
            </Button>
            <Button
              className="w-fit! m-0! cursor-pointer"
              onClick={() => setShowAddCategory(true)}
            >
              Add Category (+)
            </Button>
            <Button
              className="w-fit! m-0! cursor-pointer"
              onClick={() => setShowAddProduct(true)}
            >
              Add Product (+)
            </Button>
          </div>
        </div>

        {products.length <= 0 ? (
          <EmptyProductState onAddProduct={() => setShowAddProduct(true)} />
        ) : (
          /* 4. Product Grid: Switched from mix of flex/grid to a pure responsive grid. */
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full pe-0 md:pe-12 py-6">
            {isLoading ? (
              <li className="flex justify-center py-6 col-span-1 sm:col-span-2 lg:col-span-3" role="status">
                <LoadingIcon />
              </li>
            ) : (
              products.map((product, index) => {
                return (
                  <li
                    key={product.id}
                    onClick={() => setProductToUpdate(index)}
                    className="w-full flex items-center relative gap-4 md:gap-6 rounded-xl transition-all cursor-pointer hover:bg-slate-50 border border-transparent hover:border-slate-100 p-2 md:p-0"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 relative shrink-0 bg-slate-100 rounded-lg overflow-hidden">
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
                      <h2 className="text-base md:text-lg font-semibold text-slate-900">
                        {product.name}
                      </h2>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-blue-600">
                          Price: ${product.price}
                        </p>
                        <p className="text-xs md:text-sm font-medium text-blue-600">
                          Category: {product.categories.map(category => category.name).join(", ")}
                        </p>
                        <p className="text-xs md:text-sm font-medium text-blue-600">
                          Stock: {product.stock}
                        </p>
                        <p
                          className={`text-xs md:text-sm font-medium ${product.isActive ? "text-green-600" : "text-red-600"}`}
                        >
                          {product.isActive
                            ? "Product Active"
                            : "Product Inactive"}
                        </p>
                      </div>
                    </div>

                    <EditIcon className="w-6 h-6 md:w-7 md:h-7 absolute top-2 right-2 md:top-0 md:right-0" />
                    {product.isActive ? (
                      <TrashIcon
                        className="w-6 h-6 md:w-7 md:h-7 absolute bottom-2 right-2 md:bottom-0 md:right-0 fill-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                      />
                    ) : (
                      <RestoreIcon
                        className="w-6 h-6 md:w-7 md:h-7 absolute bottom-2 right-2 md:bottom-0 md:right-0 fill-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreProduct(product.id);
                        }}
                      />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}

        {/* 5. Pagination: Added flex-wrap to prevent overflow on mobile devices. */}
        <div className="flex flex-wrap justify-center items-center gap-1 mt-4 md:mt-6 w-full">
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1}
            className="px-3 py-2 md:px-4 transition-all rounded-l-lg cursor-pointer hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600"
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
                    className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all rounded-lg font-medium text-sm md:text-base
        ${
          pageNumber === page
            ? "bg-blue-600 text-white shadow-md"
            : "cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900"
        }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (pageNumber == 2 && page > 3) {
                return (
                  <p
                    key={pageNumber}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900"
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
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all rounded-lg font-medium cursor-pointer text-slate-600 hover:bg-blue-100 hover:text-blue-900"
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
            className="px-3 py-2 md:px-4 transition-all cursor-pointer rounded-r-lg hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none text-slate-600"
          >
            &gt;
          </button>
        </div>
      </div>

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
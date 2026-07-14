import { ChangeEvent, useState } from "react";
import TextInput from "../form/TextInput";
import { EditProduct as EditProductType, Product } from "@/types/product.type";
import FileInput from "../form/FileInput";
import NumberInput from "../form/NumberInput";
import SubmitButton from "../form/SubmitButton";
import { useGetCategoriesQuery, useUpdateProductMutation } from "@/hooks/useProductMutation";
import { getErrorMessage } from "@/utils/validator";
import ErrorDiv from "../form/ErrorDiv";
import TextAreaInput from "../form/TextAreaInput";

interface EditProductProps {
  editProduct: EditProductType;
  setUpdateProduct: (value: EditProductType | null) => void;
}

export default function EditProduct({
  editProduct,
  setUpdateProduct,
}: EditProductProps) {
  const [product, setProduct] = useState<EditProductType>(editProduct);
  const [newImages, setNewImages] = useState<File[] | null>(null);
  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];
  const {
    mutate: updateProduct,
    isPending,
    isError,
    error,
  } = useUpdateProductMutation();

  const errorMessage = getErrorMessage(error);

  const handleSettingsChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement,
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = event.target;
    if (event.target instanceof HTMLInputElement) {
      const parsedValue =
        type === "number"
          ? parseFloat(value)
          : type == "file"
            ? event.target.files
              ? setNewImages(Array.from(event.target.files))
              : []
            : value;
      if (type !== "file") {
        setProduct((product) => ({ ...product, [name]: parsedValue }));
      }
    } else {
      setProduct((product) => ({ ...product, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", product.id);
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("categories", product.categories.toString());
    data.append("isActive", product.isActive.toString());
    data.append("price", product.price.toString());
    data.append("stock", product.stock.toString());
    data.append("updatedAt", Date.now().toString());

    if (newImages && newImages.length > 0) {
      data.append("imagesUrl", "");
      newImages.forEach((file) => data.append("image", file));
    } else {
      data.append("imagesUrl", product.imagesUrl.join(","));
    }

    updateProduct(data, {
      onSuccess: () => setUpdateProduct(null),
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      onClick={() => setUpdateProduct(null)}
    >
      {/* 1. Modal Container: Adaptive padding to save vertical and horizontal space on small screens */}
      <div
        className="w-full max-w-2xl bg-blue-50 p-5 md:p-8 flex flex-col rounded-2xl shadow-2xl z-10 max-h-[95vh] md:max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 2. Header: Added padding-right (pr-8) so the text never overlaps the absolute positioned close button on a tiny screen */}
        <h1 className="text-center text-xl md:text-2xl text-blue-950 font-bold mb-4 md:mb-6 pr-8 md:pr-0">
          Update Product
        </h1>

        <ErrorDiv isError={isError} errorMessage={errorMessage} />

        {/* 3. Close Button: Adjusted positioning slightly for better touch targets on mobile */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 30 30"
          className="absolute right-4 top-4 md:right-5 md:top-5 cursor-pointer fill-blue-950 hover:fill-red-600 transition-colors"
          onClick={() => setUpdateProduct(null)}
          aria-label="Close modal"
          role="button"
        >
          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
        </svg>

        {/* 4. Form Grid: Refined the gaps so inputs aren't too spread out on mobile */}
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 py-2 md:py-4"
          onSubmit={handleSubmit}
        >
          <TextInput
            type="text"
            placeholder="Name"
            id="name"
            label="Name:"
            inputValue={product.name}
            onChange={handleSettingsChange}
            className="flex flex-col"
          />
          <NumberInput
            placeholder="price"
            id="price"
            label="Price:"
            inputValue={product.price}
            onChange={handleSettingsChange}
            className="flex flex-col"
          />

          <div className="flex flex-col col-span-1 sm:col-span-2 gap-1 md:gap-2">
            <label
              htmlFor="category"
              className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base"
            >
              Category:
            </label>

            {categories.length === 0 ? (
              <p className="text-sm text-slate-400 animate-pulse">
                Loading categories...
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = product.categories?.includes(
                      category.id,
                    );

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setProduct((oldProduct) => {
                          const currentCats = oldProduct.categories || [];
                          const nextCats = isSelected
                            ? currentCats.filter((id) => id !== category.id)
                            : [...currentCats, category.id];
                          return { ...oldProduct, categories: nextCats };
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/10 scale-102"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <TextAreaInput
            placeholder="Description"
            id="description"
            label="Description:"
            inputValue={product.description}
            onChange={handleSettingsChange}
            className="flex flex-col col-span-1 sm:col-span-2"
          />

          <FileInput
            label="Image:"
            id="imagesUrl"
            isMultiple={true}
            onChange={handleSettingsChange}
            className="flex flex-col"
          />

          <NumberInput
            placeholder="stock"
            id="stock"
            label="Stock:"
            inputValue={product.stock}
            onChange={handleSettingsChange}
            className="flex flex-col"
          />

          <SubmitButton
            className="col-span-1 sm:col-span-2 mt-2 md:mt-0"
            isPending={isPending}
          >
            {isPending ? "Updating product..." : "Update Product"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
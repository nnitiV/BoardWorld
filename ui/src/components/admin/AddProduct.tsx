import React, { ChangeEvent, SetStateAction, useState } from "react";
import { CreateProduct } from "@/types/product.type";
import TextInput from "../form/TextInput";
import NumberInput from "../form/NumberInput";
import SubmitButton from "../form/SubmitButton";
import { useCreateProductMutation, useGetCategoriesQuery } from "@/hooks/useProductMutation";
import ErrorDiv from "../form/ErrorDiv";
import { getErrorMessage } from "@/utils/validator";
import FileInput from "../form/FileInput";
import SuccessDiv from "../form/SuccessDiv";
import TextAreaInput from "../form/TextAreaInput";

interface AddProductProps {
  setShowAddProduct: (value: SetStateAction<boolean>) => void;
}

export default function AddProduct({ setShowAddProduct }: AddProductProps) {
  const { data: response } = useGetCategoriesQuery();
  const categories = response?.categories || [];
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    description: "",
    price: 0.0,
    stock: 0,
    categoryId: "",
    imagesUrl: [],
  });
  const {
    mutate: createProduct,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateProductMutation();
  const errorMessage = getErrorMessage(error);

  const handleSettingsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    if (event.target instanceof HTMLInputElement) {
      const parsedValue =
        type === "number"
          ? parseFloat(value)
          : type == "file"
            ? event.target.files
              ? Array.from(event.target.files)
              : []
            : value;
      setProduct((product) => ({ ...product, [name]: parsedValue }));
    } else {
      setProduct((product) => ({ ...product, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product)
    const data = new FormData();
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("categoryId", product.categoryId);
    data.append("price", product.price.toString());
    data.append("stock", product.stock.toString());
    product.imagesUrl.forEach((file) => data.append("image", file));
    createProduct(data, {
      onSuccess: () =>
        setProduct({
          name: "",
          description: "",
          price: 0.0,
          stock: 0,
          categoryId: "",
          imagesUrl: [],
        }),
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-0 px-4"
      onClick={() => setShowAddProduct(false)}
    >
      <div
        className="w-1/2 mx-auto z-1 bg-white p-5 rounded-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Add Product
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 30 30"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => setShowAddProduct(false)}
        >
          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
        </svg>
        <SuccessDiv isSuccess={isSuccess} successMessage="Product created!" />
        <ErrorDiv isError={isError} errorMessage={errorMessage} />
        <form className="grid grid-cols-2 gap-4 py-4" onSubmit={handleSubmit}>
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
          <div className="flex flex-col col-span-2 gap-2 ">
            <label htmlFor="category" className="ms-2 text-blue-950 font-bold">
              Category:
            </label>
            <select
              name="category"
              id="category"
              className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg 
                cursor-pointer transition-all hover:border-blue-400 focus:outline-none focus:ring-2
                focus:ring-blue-500/20 focus:border-blue-500"
              value={product.categoryId}
              onChange={(e) => {
                setProduct((oldProduct) => ({
                  ...oldProduct,
                  categoryId: e.target.value,
                }));
              }}
              defaultValue={categories.length > 0 ? categories[0].id : ""}
            >
              <option value="" disabled>
                {categories.length > 0
                  ? "Select a category"
                  : "Loading categories..."}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <TextAreaInput
            placeholder="Description"
            id="description"
            label="Description:"
            inputValue={product.description}
            onChange={handleSettingsChange}
            className="flex flex-col col-span-2"
          />
          <FileInput
            label="Image:"
            id="imagesUrl"
            isMultiple={true}
            resetKey={product.imagesUrl[0]}
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
          <SubmitButton className="col-span-2" isPending={isPending}>
            {isPending ? "Adding product..." : "Add Product"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

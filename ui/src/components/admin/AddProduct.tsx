import React, { ChangeEvent, SetStateAction, useState } from "react";
import { CreateProduct } from "@/types/product.type";
import TextInput from "../form/TextInput";
import NumberInput from "../form/NumberInput";
import SubmitButton from "../form/SubmitButton";
import { useCreateProductMutation } from "@/hooks/useProductMutation";
import ErrorDiv from "../form/ErrorDiv";
import { getErrorMessage } from "@/utils/validator";
import FileInput from "../form/FileInput";
import SuccessDiv from "../form/SuccessDiv";
import TextAreaInput from "../form/TextAreaInput";

interface AddProductProps {
  setShowAddProduct: (value: SetStateAction<boolean>) => void;
}

export default function AddProduct({ setShowAddProduct }: AddProductProps) {
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    description: "",
    price: 0.0,
    stock: 0,
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
    const data = new FormData();
    data.append("name", product.name);
    data.append("description", product.description);
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
        className="w-1/2 mx-auto z-1 bg-white p-5 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Add Product
        </h1>
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

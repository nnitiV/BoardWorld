import React, { ChangeEvent, useState } from "react";
import { CreateProduct } from "@/types/product.type";
import TextInput from "../form/TextInput";
import NumberInput from "../form/NumberInput";
import SubmitButton from "../form/SubmitButton";
import { useCreateProductMutation } from "@/hooks/useProductMutation";
import ErrorDiv from "../form/ErrorDiv";
import { getErrorMessage } from "@/utils/validator";
import FileInput from "../form/FileInput";
import SuccessDiv from "../form/SuccessDiv";

export default function AddProduct() {
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    price: 0.0,
    stock: 0,
    imageUrl: "",
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
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { name, value, type } = event.target;
    const parsedValue =
      type === "number"
        ? parseFloat(value)
        : type == "file"
          ? event.target.files && event.target.files[0]
          : value;
    setProduct((product) => ({ ...product, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", product.name);
    data.append("price", product.price.toString());
    data.append("stock", product.stock.toString());
    data.append("image", product.imageUrl);
    createProduct(data, {
      onSuccess: () => setProduct({
        name: "",
        price: 0.0,
        stock: 0,
        imageUrl: "",
      })
    });
  };

  return (
    <div className="w-1/2 mx-auto">
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
        <FileInput
          label="Image:"
          id="imageUrl"
          resetKey={product.imageUrl}
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
  );
}

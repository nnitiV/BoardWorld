import { ChangeEvent, useState } from "react";
import TextInput from "../form/TextInput";
import { Product } from "@/types/product.type";
import FileInput from "../form/FileInput";
import NumberInput from "../form/NumberInput";
import SubmitButton from "../form/SubmitButton";
import { useUpdateProductMutation } from "@/hooks/useProductMutation";
import { getErrorMessage } from "@/utils/validator";
import ErrorDiv from "../form/ErrorDiv";
import CheckboxInput from "../form/CheckboxInput";

interface EditProductProps {
  editProduct: Product;
  setUpdateProduct: (value: Product | null) => void;
}

export default function EditProduct({
  editProduct,
  setUpdateProduct,
}: EditProductProps) {
  const [product, setProduct] = useState<Product>(editProduct);
  const [newImage, setNewImage] = useState<File | null>(null);

  const {
    mutate: updateProduct,
    isPending,
    isError,
    error,
  } = useUpdateProductMutation();
  
  const errorMessage = getErrorMessage(error);

  const handleSettingsChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      if (files && files.length > 0) {
        setNewImage(files[0]); 
      }
      return; 
    }

    const parsedValue = type === "number" ? parseFloat(value) : value;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", product.id);
    data.append("name", product.name);
    data.append("price", product.price.toString());
    data.append("stock", product.stock.toString());
    data.append("isActive", product.isActive.toString());
    
    if (newImage) {
      data.append("imageUrl", newImage);
    } else {
      data.append("imageUrl", product.imageUrl);
    }
    
    updateProduct(data, {
      onSuccess: () => setUpdateProduct(null),
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-0 px-4"
      onClick={() => setUpdateProduct(null)}
    >
      <div
        className="w-full max-w-2xl bg-blue-50 p-8 flex flex-col rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ErrorDiv isError={isError} errorMessage={errorMessage} />
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Update Product 
        </h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4" onSubmit={handleSubmit}>
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
          <CheckboxInput id="isActive" label="isActive" checked={product.isActive} setChecked={() => setProduct(prevProd => ({
            ...prevProd,
            isActive: !prevProd.isActive
          }))}  />
          <SubmitButton className="col-span-1 sm:col-span-2" isPending={isPending}>
            {isPending ? "Updating product..." : "Update Product"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
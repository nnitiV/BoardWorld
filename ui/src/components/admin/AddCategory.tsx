import React, { ChangeEvent, SetStateAction, useState } from "react";
import { CreateCategory } from "@/types/product.type";
import TextInput from "../form/TextInput";
import SubmitButton from "../form/SubmitButton";
import ErrorDiv from "../form/ErrorDiv";
import { getErrorMessage } from "@/utils/validator";
import SuccessDiv from "../form/SuccessDiv";
import TextAreaInput from "../form/TextAreaInput";
import { useCreateCategoryMutation } from "@/hooks/useProductMutation";

interface AddCategoryProps {
  setShowAddCategory: (value: SetStateAction<boolean>) => void;
}

export default function AddCategory({ setShowAddCategory }: AddCategoryProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLocalError, setIsLocalError] = useState<boolean>(false);
  const [category, setCategory] = useState<CreateCategory>({
    name: "",
    description: "",
  });
  const {
    mutate: createCategory,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateCategoryMutation();
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
      setCategory((category) => ({ ...category, [name]: parsedValue }));
    } else {
      setCategory((category) => ({ ...category, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    setIsLocalError(false);
    if(!category.name  || category.name.trim().length == 0) {
        setLocalError("Please, provide a valid name or desecription.");
        setIsLocalError(true);
        return;
    }
    e.preventDefault();
    createCategory(category, {
      onSuccess: () =>
        setCategory({
          name: "",
          description: "",
        }),
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-0 px-4"
      onClick={() => setShowAddCategory(false)}
    >
      <div
        className="w-1/2 mx-auto z-1 bg-white p-5 rounded-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Add Category
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 30 30"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => setShowAddCategory(false)}
        >
          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
        </svg>
        <SuccessDiv isSuccess={isSuccess} successMessage="Category created!" />
        <ErrorDiv isError={isLocalError || isError} errorMessage={localError || errorMessage} />
        <form className="grid grid-cols-2 gap-4 py-4" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Name"
            id="name"
            label="Name:"
            inputValue={category.name}
            onChange={handleSettingsChange}
            className="flex flex-col col-span-2"
          />
          <TextAreaInput
            placeholder="Description"
            id="description"
            label="Description:"
            inputValue={category.description || ""}
            onChange={handleSettingsChange}
            className="flex flex-col col-span-2"
          />
          <SubmitButton className="col-span-2" isPending={isPending}>
            {isPending ? "Adding category..." : "Add Category"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

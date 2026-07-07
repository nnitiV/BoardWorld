import React, { ChangeEvent, useState } from "react";
import ErrorDiv from "../form/ErrorDiv";
import TextInput from "../form/TextInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/SubmitButton";
import { useUpdateCategoryMutation } from "@/hooks/useProductMutation";
import { getErrorMessage } from "@/utils/validator";
import { UpdateCategory } from "@/types/product.type";

interface EditCategoryProps {
  editCategory: UpdateCategory;
  setCategoryIdToEdit: (value: UpdateCategory | null) => void;
}

export default function EditCategory({
  editCategory,
  setCategoryIdToEdit,
}: EditCategoryProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLocalError, setIsLocalError] = useState<boolean>(false);
  const [category, setCategory] = useState<UpdateCategory>(
    editCategory || {
      id: "",
      name: "",
      description: "",
    },
  );
  const {
    mutate: updateCategory,
    isPending,
    isError,
    error,
  } = useUpdateCategoryMutation();
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
    if (!category.name || category.name.trim().length == 0) {
      setLocalError("Please, provide a valid name or desecription.");
      setIsLocalError(true);
      return;
    }
    e.preventDefault();
    updateCategory(category, {
      onSuccess: () => {
        setCategory({
          id: "",
          name: "",
          description: "",
        });
        setCategoryIdToEdit(null);
      },
    });
  };
  return (
    <form className="grid grid-cols-2 gap-4 p-4" onSubmit={handleSubmit}>
      <ErrorDiv
        isError={isLocalError || isError}
        errorMessage={localError || errorMessage}
      />
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
        {isPending ? "Updating category..." : "Update Category"}
      </SubmitButton>
    </form>
  );
}

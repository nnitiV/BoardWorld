import {
  useGetCategoriesQuery,
} from "@/hooks/useProductMutation";
import TrashIcon from "../Icons/TrashIcon";
import { SetStateAction, useState } from "react";
import EditIcon from "../Icons/EditIcon";
import EditCategory from "./EditCategory";
import { UpdateCategory } from "@/types/product.type";

interface EditCategoriesProps {
  setShowEditCategories: (value: SetStateAction<boolean>) => void;
}

export default function EditCategoriesModal({
  setShowEditCategories,
}: EditCategoriesProps) {
  const [categoryToEdit, setCategoryToEdit] = useState<UpdateCategory | null>(null);
  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const handleSetCategoryToEdit = (id: string) =>{
    const editCategory = categories.find(cat => cat.id == id);
    if(editCategory) {
      setCategoryToEdit(editCategory);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-1 px-4"
      onClick={() => setShowEditCategories(false)}
    >
      <div
        className="w-full max-w-2xl bg-blue-50 py-8 flex flex-col rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {categoryToEdit && (
          <p
            className="left-5 top-10 absolute text-2xl text-slate-950 font-bold cursor-pointer"
            onClick={() => setCategoryToEdit(null)}
          >
            &lt;
          </p>
        )}
        <h1 className="text-center text-2xl text-blue-950 font-bold mb-6">
          Edit Categories
        </h1>
        {categoryToEdit ? (
          <EditCategory editCategory={categoryToEdit} setCategoryIdToEdit={setCategoryToEdit} />
        ) : (
          categories.length > 0 && (
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex justify-between border-y border-slate-500 p-2 rounded align-middle transition-all hover:cursor-pointer hover:bg-slate-300/25"
                >
                  <h2 className="text-2xl text-blue-950 font-bold my-auto">
                    {category.name}
                  </h2>
                  <p className="flex">
                    <EditIcon
                      className="w-10 h-10 fill-slate-950"
                      onClick={() => handleSetCategoryToEdit(category.id)}
                    />
                    <TrashIcon className="w-10 h-10 fill-red-600" />
                  </p>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}

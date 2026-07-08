import {
  useDeleteCategoryMutation,
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
  const { mutate: deleteCategory } = useDeleteCategoryMutation();

  const handleSetCategoryToEdit = (id: string) => {
    const editCategory = categories.find(cat => cat.id == id);
    if (editCategory) {
      setCategoryToEdit(editCategory);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      onClick={() => setShowEditCategories(false)}
    >
      {/* 1. Modal Container: Added internal padding (p-4 md:p-8) and safe max-height */}
      <div
        className="w-full max-w-2xl bg-blue-50 p-4 md:p-8 flex flex-col rounded-2xl shadow-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {categoryToEdit && (
          /* 2. Back Button: Swapped <p> for <button>, adjusted mobile coordinates */
          <button
            className="absolute left-4 top-4 md:left-8 md:top-8 text-xl md:text-2xl text-slate-950 font-bold cursor-pointer hover:text-blue-600 transition-colors flex items-center justify-center w-8 h-8"
            onClick={() => setCategoryToEdit(null)}
            aria-label="Go back"
          >
            &lt;
          </button>
        )}
        
        {/* 3. Title: Added top margin on mobile to clear the absolute back button */}
        <h1 className="text-center text-xl md:text-2xl text-blue-950 font-bold mb-4 md:mb-6 mt-2 md:mt-0">
          Edit Categories
        </h1>
        
        {categoryToEdit ? (
          <EditCategory 
            editCategory={categoryToEdit} 
            setCategoryIdToEdit={setCategoryToEdit} 
          />
        ) : (
          categories.length > 0 && (
            <ul className="flex flex-col gap-2 md:gap-3">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex justify-between items-center border border-slate-300 p-3 md:p-4 rounded-lg bg-white transition-all hover:shadow-md"
                >
                  {/* 4. Text Truncation: Prevents long text from breaking the flex row */}
                  <h2 className="text-base md:text-lg text-blue-950 font-bold my-auto truncate mr-2">
                    {category.name}
                  </h2>
                  
                  {/* 5. Icon Container: Swapped <p> for <div>, added gap and shrink-0 */}
                  <div className="flex items-center gap-3 md:gap-4 shrink-0">
                    <EditIcon
                      className="w-6 h-6 md:w-8 md:h-8 fill-slate-700 hover:fill-blue-600 cursor-pointer transition-colors"
                      onClick={() => handleSetCategoryToEdit(category.id)}
                    />
                    <TrashIcon 
                      className="w-6 h-6 md:w-8 md:h-8 fill-red-500 hover:fill-red-700 cursor-pointer transition-colors" 
                      onClick={() => deleteCategory(category.id)} 
                    />
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
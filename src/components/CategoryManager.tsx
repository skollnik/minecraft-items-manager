import { useState } from "react";
import type { Category, Item } from "../types/types";
import { toast } from "react-toastify";

interface CategoryManagerProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  items: Item[];
  setItems: (items: Item[]) => void;
}

const predefinedColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Gray", value: "bg-gray-500" },
  { name: "White", value: "bg-white" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Lime", value: "bg-lime-500" },
  { name: "Amber", value: "bg-amber-500" },
  { name: "Cyan", value: "bg-cyan-500" },
  { name: "Rose", value: "bg-rose-500" },
];

export const CategoryManager = ({
  categories,
  setCategories,
  items,
  setItems,
}: CategoryManagerProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0].value);

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      toast.error("Category name cannot be empty!");
      return;
    }

    if (categories.some((category) => category.name === newCategory)) {
      toast.error("Category already exists!");
      return;
    }

    setCategories([...categories, { name: newCategory, color: selectedColor }]);
    setNewCategory("");
    setSelectedColor(predefinedColors[0].value);
  };

  const handleDeleteCategory = (categoryName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the category "${categoryName}"?`
    );
    if (confirmed) {
      setCategories(
        categories.filter((category) => category.name !== categoryName)
      );

      const updatedItems = items.map((item) => ({
        ...item,
        categories: item.categories?.filter(
          (category) => category.name !== categoryName
        ),
      }));
      setItems(updatedItems);
    }
  };

  return (
    <div className="w-3/4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <div className="w-3/4 flex items-center justify-center gap-3">
        <input
          type="text"
          placeholder="Enter category name..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full max-w-md p-2 text-white border rounded-md bg-gray-800"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {predefinedColors.map((color) => (
          <button
            key={color.value}
            onClick={() => setSelectedColor(color.value)}
            className={`w-7 h-7 rounded-md border-2 ${
              selectedColor === color.value
                ? "border-white"
                : "border-transparent"
            } ${color.value}`}
          ></button>
        ))}
      </div>
      <button
        onClick={handleAddCategory}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
      >
        Add Category
      </button>
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Categories:</h3>
        <ul className="list-disc list-inside">
          {categories.map((category, index) => (
            <li key={index} className="flex items-center gap-2 mb-1 text-white">
              <div className={`w-4 h-4 rounded ${category.color}`}></div>
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category.name)}
                className="text-red-500 hover:underline ml-auto cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import type { Category, Item } from "../types/types";

export const CategoryModal = ({
  selectedItem,
  categories,
  handleAddToCategory,
  onClose,
}: {
  selectedItem: Item;
  categories: Category[];
  handleAddToCategory: (itemId: string, categoryName: string) => void;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-[rgba(17,24,39,0.75)] flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-96 max-h-11/12 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          Manage Categories for "{selectedItem.name}"
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => {
            const isInCategory = category.items?.some(
              (item) => item.id === selectedItem.id
            );

            return (
              <li
                key={category.name}
                className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${
                  isInCategory ? "border border-gray-500" : "hover:bg-gray-700"
                }`}
                onClick={() =>
                  handleAddToCategory(selectedItem.id, category.name)
                }
              >
                <div
                  className={`w-4 h-4 rounded ${category.color}`}
                  title={category.name}
                ></div>
                <span>{category.name}</span>
              </li>
            );
          })}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

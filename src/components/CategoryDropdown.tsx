import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import type { Category } from "../types/types";

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategory: Category | "All";
  setSelectedCategory: (category: Category | "All") => void;
}

export const CategoryDropdown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryDropdownProps) => {
  return (
    <div className="w-full max-w-md mb-6">
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className="relative">
          <Listbox.Button className="w-full p-2 text-white bg-gray-800 border rounded-md text-left">
            <div className="flex items-center gap-2">
              {selectedCategory !== "All" ? (
                <>
                  <div
                    className={`w-3 h-3 rounded ${selectedCategory.color}`}
                  />
                  <span>{selectedCategory.name}</span>
                </>
              ) : (
                <span>All</span>
              )}
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 text-white shadow-lg z-50">
            <Listbox.Option value="All" as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`cursor-pointer select-none relative px-4 py-2 list-none ${
                    active ? "bg-gray-700" : ""
                  }`}
                >
                  <span
                    className={`block ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    Show all items
                  </span>
                </li>
              )}
            </Listbox.Option>
            {categories.map((category) => (
              <Listbox.Option
                key={category.name}
                value={category}
                as={Fragment}
              >
                {({ active, selected }) => (
                  <li
                    className={`cursor-pointer select-none relative px-4 py-2 list-none ${
                      active ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${category.color}`} />
                      <span
                        className={`block ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

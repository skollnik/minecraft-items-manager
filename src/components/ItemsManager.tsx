import { useState } from "react";
import type { Category, Item } from "../types/types";
import { SearchBar } from "./SearchBar";
import { ItemGrid } from "./ItemsGrid";
import { CategoryModal } from "./CategoryModal";
import { CategoryDropdown } from "./CategoryDropdown";

interface ItemsManagerProps {
  items: Item[];
  setItems: (items: Item[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: Category[];
  setCategories: (
    categories: Category[] | ((prevCategories: Category[]) => Category[])
  ) => void;
}

export const ItemsManager = ({
  items,
  setItems,
  searchTerm,
  setSearchTerm,
  categories,
  setCategories,
}: ItemsManagerProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [showUncategorizedOnly, setShowUncategorizedOnly] = useState(false);

  const handleAddToCategory = (itemId: string, categoryName: string) => {
    const currentItem = items.find((item) => item.id === itemId);
    const currentCategory = categories.find((cat) => cat.name === categoryName);

    if (!currentItem || !currentCategory) return;

    const isInCategory = currentCategory.items?.some((i) => i.id === itemId);
    const isItemLinked = currentItem.categories?.some(
      (cat) => cat.name === categoryName
    );

    const updatedCategories = categories.map((cat) =>
      cat.name === categoryName
        ? {
            ...cat,
            items: isInCategory
              ? cat.items?.filter((i) => i.id !== itemId)
              : [...(cat.items || []), { ...currentItem, categories: [] }],
          }
        : cat
    );

    const updatedItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            categories: isItemLinked
              ? item.categories?.filter((cat) => cat.name !== categoryName)
              : [
                  ...(item.categories || []),
                  { name: currentCategory.name, color: currentCategory.color },
                ],
          }
        : item
    );

    setCategories(updatedCategories);
    setItems(updatedItems);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      item.categories?.some(
        (category) => category.name === selectedCategory.name
      );

    if (showUncategorizedOnly) {
      return (
        matchesSearch && (!item.categories || item.categories.length === 0)
      );
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col items-center">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p className="mb-3">Show items by category:</p>
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="switch" className="text-white">
          Show only uncategorized items
        </label>
        <div
          className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${
            showUncategorizedOnly ? "bg-gray-800" : "bg-gray-400"
          }`}
          onClick={() => setShowUncategorizedOnly(!showUncategorizedOnly)}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
              showUncategorizedOnly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </div>
      <div className="flex mb-4 gap-1 text-xl">Total Items: <p className="font-bold">{filteredItems.length}</p></div>
      <ItemGrid items={filteredItems} onItemClick={setSelectedItem} />
      {selectedItem && (
        <CategoryModal
          selectedItem={selectedItem}
          categories={categories}
          handleAddToCategory={handleAddToCategory}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

import type { Category } from "../types/types";

interface SelectCategoryProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SelectCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: SelectCategoryProps) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="w-full max-w-md p-2 mb-6 text-white border rounded-md bg-gray-800"
    >
      <option value="All">All</option>
      {categories.map((category) => (
        <option key={category.name} value={category.name}>
          <div className={(category.color, "w-2 h-2")} />
          {category.name}
        </option>
      ))}
    </select>
  );
};

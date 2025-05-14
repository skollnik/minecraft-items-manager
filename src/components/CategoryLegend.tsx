import type { Category } from "../types/types";

interface CategoryLegendProps {
  categories: Category[];
}

export const CategoryLegend = ({ categories }: CategoryLegendProps) => {
  return (
    <div className="absolute top-4 left-4 bottom-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg min-w-80 max-w-80 max-h-screen overflow-y-auto no-scrollbar">
      <h3 className="text-lg font-bold mb-2">Categories ({categories.length})</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex-shrink-0 ${category.color}`}
              title={category.name}
            ></div>
            <span className="break-words overflow-hidden text-ellipsis whitespace-nowrap">
              {category.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

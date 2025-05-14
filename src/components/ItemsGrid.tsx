import type { Item } from "../types/types";

export const ItemGrid = ({
  items,
  onItemClick,
}: {
  items: Item[];
  onItemClick: (item: Item) => void;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-5xl">
    {items.map((item) => (
      <div
        key={item.id}
        className="bg-gray-800 min-h-40 p-4 rounded-lg flex flex-col items-center cursor-pointer hover:scale-105 transition-transform relative"
        onClick={() => onItemClick(item)}
      >
        <img
          src={`images/${item.id.replace(/:/g, "_")}.png`}
          alt={item.name}
          className="w-16 h-16 mb-2"
          loading="lazy"
        />
        <div className="text-center">
          <p className="text-sm font-medium">{item.name}</p>
          {item.legacyId && (
            <small className="text-gray-400">Legacy ID: {item.legacyId}</small>
          )}
        </div>
        <div className="gap-1 mt-2 w=full flex justify-center items-center absolute bottom-2">
          {item.categories?.map((category) => (
            <div
              key={category.name}
              className={`w-4 h-1 bottom-2 rounded ${category.color}`}
              title={category.name}
            ></div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

import type { Category, Item } from "../types/types";

const STORAGE_KEY = "minecraft_items_data";

export const saveToLocalStorage = (categories: Category[], items: Item[]) => {
  const data = { categories, items };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromLocalStorage = (): {
  categories: Category[];
  items: Item[];
} | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

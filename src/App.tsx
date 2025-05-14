import React, { useEffect, useState } from "react";
import ids_1_21_5 from "./data/ids_1.21.5.json";
import ids_1_21_5_lan_en_us_raw from "./data/ids_1.21.5_lan_en_us.json" with { type: "json" };
import legacyRaw from "./data/legacy.json";
import { Tabs } from "./components/Tabs";
import { ItemsManager } from "./components/ItemsManager";
import { CategoryManager } from "./components/CategoryManager";
import type { Category, Item, LanguageMap, LegacyMap } from "./types/types";
import { Bounce, ToastContainer } from "react-toastify";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/storage";
import { CategoryLegend } from "./components/CategoryLegend";

const ids_1_21_4_lan_en_us = ids_1_21_5_lan_en_us_raw as LanguageMap;
const legacyMap = legacyRaw as LegacyMap;

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"itemsManager" | "categoryManager">("itemsManager");

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData && savedData.categories.length > 0 && savedData.items.length > 0) {
      const updatedItems = savedData.items.map((item) => ({
        ...item,
        categories: savedData.categories
          .filter((category) =>
            category.items?.some((categoryItem) => categoryItem.id === item.id)
          )
          .map((category) => ({
            name: category.name,
            color: category.color,
          })),
      }));
  
      setCategories(savedData.categories);
      setItems(updatedItems);
    } else {
        const mappedItems = ids_1_21_5.map((id: string) => {
        const name = ids_1_21_4_lan_en_us[id] || id;
        const legacyId = legacyMap[id];
        return { id, name, legacyId, categories: [] };
      });
      setItems(mappedItems);
      saveToLocalStorage([], mappedItems);
    }
  }, []);
  
  useEffect(() => {
    if (items.length > 0 || categories.length > 0) {
      saveToLocalStorage(categories, items);
    }
  }, [categories, items]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <CategoryLegend categories={categories} />
      <h1 className="text-3xl font-bold mb-6">Minecraft Items Manager</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "itemsManager" ? (
        <ItemsManager
          items={items}
          setItems={setItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          setCategories={setCategories}
        />
      ) : (
        <CategoryManager
          items={items}
          setItems={setItems}
          categories={categories}
          setCategories={setCategories}
        />
      )}
      <ToastContainer transition={Bounce} />
    </div>
  );
};

export default App;
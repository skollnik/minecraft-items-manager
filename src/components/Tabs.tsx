interface TabsProps {
  activeTab: "itemsManager" | "categoryManager";
  setActiveTab: (tab: "itemsManager" | "categoryManager") => void;
}

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab("itemsManager")}
        className={`px-4 py-2 bg-transparent cursor-pointer ${
          activeTab === "itemsManager"
            ? "border-b-2 border-gray-700"
            : "text-gray-300"
        }`}
      >
        Items Manager
      </button>
      <button
        onClick={() => setActiveTab("categoryManager")}
        className={`px-4 py-2 bg-transparent cursor-pointer ${
          activeTab === "categoryManager"
            ? "border-b-2 border-gray-700"
            : "text-gray-300"
        }`}
      >
        Category Manager
      </button>
    </div>
  );
};

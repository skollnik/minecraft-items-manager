export const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => (
  <input
    type="text"
    placeholder="Search items..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md p-2 mb-6 text-white border rounded-md bg-gray-800"
  />
);

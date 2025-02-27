import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const newQuery = event.target.value.toLowerCase();
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Buscar Pokémon..."
        onChange={handleChange}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default SearchBar;

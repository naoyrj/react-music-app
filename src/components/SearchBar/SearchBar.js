import { useState } from "react";
import "./styles.css";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const artist = inputValue.trim();

    if (!artist) {
      return;
    }

    onSearch(artist);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Escribe un artista, por ejemplo Coldplay"
      />

      <button
        type="submit"
        className="search-bar__button"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
import { useState } from "react";
import {
  SearchForm,
  SearchInput,
  SearchButton
} from "./styles";

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
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Escribe un artista, por ejemplo Coldplay"
      />

      <SearchButton type="submit">
        Buscar
      </SearchButton>
    </SearchForm>
  );
}

export default SearchBar;
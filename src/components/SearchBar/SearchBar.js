import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSongs } from "../../redux/slices/searchSlice";

import {
  SearchForm,
  SearchInput,
  SearchButton
} from "./styles";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.search.loading
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const artist = inputValue.trim();

    if (!artist) {
      return;
    }

    dispatch(fetchSongs(artist));
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        value={inputValue}
        onChange={(event) =>
          setInputValue(event.target.value)
        }
        placeholder="Escribe un artista, por ejemplo Coldplay"
      />

      <SearchButton
        type="submit"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Buscar"}
      </SearchButton>
    </SearchForm>
  );
}

export default SearchBar;
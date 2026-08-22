import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Song from "../Song/Song";
import { addSong } from "../../redux/slices/librarySlice";

import {
  ResultsSection,
  ResultsTitle,
  ResultsList,
  ResultItem,
  DetailLink
} from "./styles";

function SearchResults() {
  const dispatch = useDispatch();

  const results = useSelector(
    (state) => state.search.results
  );

  const loading = useSelector(
    (state) => state.search.loading
  );

  const error = useSelector(
    (state) => state.search.error
  );

  const handleAddSong = (song) => {
    dispatch(addSong(song));
  };

  if (loading) {
    return (
      <ResultsSection>
        <ResultsTitle>Cargando...</ResultsTitle>
      </ResultsSection>
    );
  }

  if (error) {
    return (
      <ResultsSection>
        <ResultsTitle>
          Hubo un problema al cargar los datos.
        </ResultsTitle>
      </ResultsSection>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <ResultsSection>
      <ResultsTitle>
        Resultados de búsqueda
      </ResultsTitle>

      <ResultsList>
        {results.map((song) => (
          <ResultItem key={song.id}>
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
              showButton={true}
              onAdd={() => handleAddSong(song)}
            />

            <DetailLink to={`/song/${song.id}`}>
              Ver detalles
            </DetailLink>
          </ResultItem>
        ))}
      </ResultsList>
    </ResultsSection>
  );
}

export default SearchResults;
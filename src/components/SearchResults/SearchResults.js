import React from "react";
import { useDispatch } from "react-redux";

import Song from "../Song/Song";
import { addSong } from "../../redux/libraryActions";

import {
  ResultsSection,
  ResultsTitle,
  ResultsList,
  ResultItem,
  DetailLink
} from "./styles";

function SearchResults({ songs }) {
  const dispatch = useDispatch();

  const handleAddSong = (song) => {
    dispatch(addSong(song));
  };

  return (
    <ResultsSection>
      <ResultsTitle>
        Resultados de búsqueda
      </ResultsTitle>

      <ResultsList>
        {songs.map((song) => (
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
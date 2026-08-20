import React from "react";
import Song from "../Song/Song";
import {
  ResultsSection,
  ResultsTitle,
  ResultsList,
  ResultItem,
  DetailLink
} from "./styles";

function SearchResults({ songs, onAdd }) {
  return (
    <ResultsSection>
      <ResultsTitle>Resultados de búsqueda</ResultsTitle>

      <ResultsList>
        {songs.map((song) => (
          <ResultItem key={song.id}>
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
              showButton={true}
              onAdd={() => onAdd(song)}
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
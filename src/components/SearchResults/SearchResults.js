import React from "react";
import { Link } from "react-router-dom";
import Song from "../Song/Song";
import "./styles.css";

function SearchResults({ songs, onAdd }) {
  return (
    <section className="search-results">
      <h2>Resultados de búsqueda</h2>

      <div className="search-results__list">
        {songs.map((song) => (
          <div
            key={song.id}
            className="search-results__item"
          >
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
              showButton={true}
              onAdd={() => onAdd(song)}
            />

            <Link
              to={`/song/${song.id}`}
              className="search-results__link"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchResults;
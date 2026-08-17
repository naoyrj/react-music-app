import React from "react";
import Song from "../Song/Song";
import "./styles.css";

function Library({ songs }) {
  return (
    <section className="library">
      <h2>Mi biblioteca</h2>

      {songs.length === 0 ? (
        <p className="library__empty">
          Todavía no has agregado canciones.
        </p>
      ) : (
        <div className="library__list">
          {songs.map((song) => (
            <Song
              key={song.id}
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
              showButton={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Library;
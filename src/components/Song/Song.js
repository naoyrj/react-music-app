import React from "react";
import "./styles.css";

function Song({ title, artist, album, duration, onAdd, showButton }) {
  return (
    <article className="song">
      <h2>{title}</h2>
      <p><strong>Artista:</strong> {artist}</p>
      <p><strong>Álbum:</strong> {album}</p>
      <p><strong>Duración:</strong> {duration}</p>

      {showButton && (
        <button className="song__button" onClick={onAdd}>
          Agregar a mi biblioteca
        </button>
      )}
    </article>
  );
}

export default Song;
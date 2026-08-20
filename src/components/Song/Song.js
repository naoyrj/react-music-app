import React from "react";
import {
  SongCard,
  SongTitle,
  SongInfo,
  SongButton
} from "./styles";

function Song({
  title,
  artist,
  album,
  duration,
  onAdd,
  showButton
}) {
  return (
    <SongCard>
      <SongTitle>{title}</SongTitle>

      <SongInfo>
        <strong>Artista:</strong> {artist}
      </SongInfo>

      <SongInfo>
        <strong>Álbum:</strong> {album}
      </SongInfo>

      <SongInfo>
        <strong>Duración:</strong> {duration}
      </SongInfo>

      {showButton && (
        <SongButton
          onClick={onAdd}
          $active={showButton}
        >
          Agregar a mi biblioteca
        </SongButton>
      )}
    </SongCard>
  );
}

export default Song;
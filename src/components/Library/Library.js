import React from "react";
import Song from "../Song/Song";
import {
  LibrarySection,
  LibraryTitle,
  LibraryList,
  EmptyMessage
} from "./styles";

function Library({ songs }) {
  return (
    <LibrarySection>
      <LibraryTitle>Mi biblioteca</LibraryTitle>

      {songs.length === 0 ? (
        <EmptyMessage>
          Todavía no has agregado canciones.
        </EmptyMessage>
      ) : (
        <LibraryList>
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
        </LibraryList>
      )}
    </LibrarySection>
  );
}

export default Library;
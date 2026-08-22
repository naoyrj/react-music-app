import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Song from "../Song/Song";
import { removeSong } from "../../redux/slices/librarySlice";

import {
  LibrarySection,
  LibraryTitle,
  LibraryList,
  EmptyMessage,
  RemoveButton
} from "./styles";

function Library() {
  const songs = useSelector(
    (state) => state.library
  );

  const dispatch = useDispatch();

  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  return (
    <LibrarySection>
      <LibraryTitle>
        Mi biblioteca
      </LibraryTitle>

      {songs.length === 0 ? (
        <EmptyMessage>
          Todavía no has agregado canciones.
        </EmptyMessage>
      ) : (
        <LibraryList>
          {songs.map((song) => (
            <div key={song.id}>
              <Song
                title={song.title}
                artist={song.artist}
                album={song.album}
                duration={song.duration}
                showButton={false}
              />

              <RemoveButton
                onClick={() =>
                  handleRemoveSong(song.id)
                }
              >
                Eliminar
              </RemoveButton>
            </div>
          ))}
        </LibraryList>
      )}
    </LibrarySection>
  );
}

export default Library;
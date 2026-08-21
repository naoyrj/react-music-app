export const ADD_SONG = "ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";

export function addSong(song) {
  return {
    type: ADD_SONG,
    payload: song
  };
}

export function removeSong(songId) {
  return {
    type: REMOVE_SONG,
    payload: songId
  };
}
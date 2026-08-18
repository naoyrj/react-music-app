import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Library from "./components/Library/Library";
import SongDetail from "./components/SongDetail/SongDetail";
import useFetch from "./hooks/useFetch";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [library, setLibrary] = useState([]);

  const url = searchTerm
    ? `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(
        searchTerm
      )}`
    : null;

  const {
    data,
    loading,
    error,
    retry
  } = useFetch(url);

  const songs =
    data && data.album
      ? data.album.map((album) => ({
          id: album.idAlbum,
          title: album.strAlbum,
          artist: album.strArtist,
          album: album.strAlbum,
          duration: album.intYearReleased
            ? `Año: ${album.intYearReleased}`
            : "No disponible"
        }))
      : [];

  const handleSearch = (artist) => {
    setSearchTerm(artist);
  };

  const addToLibrary = (song) => {
    const alreadyAdded = library.some(
      (librarySong) => librarySong.id === song.id
    );

    if (!alreadyAdded) {
      setLibrary((currentLibrary) => [
        ...currentLibrary,
        song
      ]);
    }
  };

  useEffect(() => {
    console.log("La biblioteca se ha actualizado.");
    console.log("Canciones en la biblioteca:", library);
  }, [library]);

  return (
    <div className="App">
      <Header title="🎵 Mi Biblioteca Musical" />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <SearchBar onSearch={handleSearch} />

              {!searchTerm && (
                <p className="app__message">
                  Busca un artista para ver sus álbumes.
                </p>
              )}

              {loading && (
                <p className="app__message">
                  Cargando...
                </p>
              )}

              {error && (
                <div className="app__error">
                  <p>
                    Hubo un problema al cargar los datos.
                    Intenta nuevamente.
                  </p>

                  <button onClick={retry}>
                    Reintentar
                  </button>
                </div>
              )}

              {!loading &&
                !error &&
                searchTerm &&
                songs.length === 0 && (
                  <p className="app__message">
                    No se encontraron resultados.
                  </p>
                )}

              {!loading &&
                !error &&
                songs.length > 0 && (
                  <SearchResults
                    songs={songs}
                    onAdd={addToLibrary}
                  />
                )}

              <Library songs={library} />
            </main>
          }
        />

        <Route
          path="/song/:id"
          element={<SongDetail />}
        />
      </Routes>
    </div>
  );
}

export default App;
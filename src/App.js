import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Library from "./components/Library/Library";
import SongDetail from "./components/SongDetail/SongDetail";
import useFetch from "./hooks/useFetch";

import {
  AppContainer,
  Main,
  AppMessage,
  ErrorBox,
  RetryButton
} from "./AppStyles";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <AppContainer>
      <Header title="🎵 Mi Biblioteca Musical" />

      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <SearchBar onSearch={handleSearch} />

              {!searchTerm && (
                <AppMessage>
                  Busca un artista para ver sus álbumes.
                </AppMessage>
              )}

              {loading && (
                <AppMessage>
                  Cargando...
                </AppMessage>
              )}

              {error && (
                <ErrorBox>
                  <p>
                    Hubo un problema al cargar los datos.
                    Intenta nuevamente.
                  </p>

                  <RetryButton onClick={retry}>
                    Reintentar
                  </RetryButton>
                </ErrorBox>
              )}

              {!loading &&
                !error &&
                searchTerm &&
                songs.length === 0 && (
                  <AppMessage>
                    No se encontraron resultados.
                  </AppMessage>
                )}

              {!loading &&
                !error &&
                songs.length > 0 && (
                  <SearchResults songs={songs} />
                )}

              <Library />
            </Main>
          }
        />

        <Route
          path="/song/:id"
          element={<SongDetail />}
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
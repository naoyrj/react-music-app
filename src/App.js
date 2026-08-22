import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Library from "./components/Library/Library";
import SongDetail from "./components/SongDetail/SongDetail";

import { fetchSongs } from "./redux/slices/searchSlice";

import {
  AppContainer,
  Main,
  AppMessage,
  ErrorBox,
  RetryButton
} from "./AppStyles";

function App() {
  const dispatch = useDispatch();

  const {
    results,
    loading,
    error
  } = useSelector((state) => state.search);

  const handleRetry = () => {
    dispatch(fetchSongs("Coldplay"));
  };

  return (
    <AppContainer>
      <Header title="🎵 Mi Biblioteca Musical" />

      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <SearchBar />

              {loading && (
                <AppMessage>
                  Cargando...
                </AppMessage>
              )}

              {error && (
                <ErrorBox>
                  <p>
                    Hubo un problema al cargar los datos.
                  </p>

                  <RetryButton onClick={handleRetry}>
                    Reintentar
                  </RetryButton>
                </ErrorBox>
              )}

              {!loading &&
                !error &&
                results.length > 0 && (
                  <SearchResults />
                )}

              {!loading &&
                !error &&
                results.length === 0 && (
                  <AppMessage>
                    Busca un artista para ver resultados.
                  </AppMessage>
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
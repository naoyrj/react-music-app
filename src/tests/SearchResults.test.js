import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import SearchResults from "../components/SearchResults/SearchResults";
import searchReducer from "../redux/slices/searchSlice";
import libraryReducer from "../redux/slices/librarySlice";
import theme from "../styles/theme";

const mockSongs = [
  {
    id: 1,
    title: "Yellow",
    artist: "Coldplay",
    album: "Parachutes",
    duration: "4:29"
  },
  {
    id: 2,
    title: "Clocks",
    artist: "Coldplay",
    album: "A Rush of Blood to the Head",
    duration: "5:07"
  }
];

const renderSearchResults = () => {
  const store = configureStore({
    reducer: {
      search: searchReducer,
      library: libraryReducer
    },
    preloadedState: {
      search: {
        results: mockSongs,
        loading: false,
        error: null
      },
      library: []
    }
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return store;
};

describe("SearchResults", () => {
  test("renderiza la lista de canciones", () => {
    renderSearchResults();

    expect(screen.getByText("Yellow")).toBeInTheDocument();
    expect(screen.getByText("Clocks")).toBeInTheDocument();
  });

  test("muestra título, artista y álbum de cada canción", () => {
    renderSearchResults();

    expect(screen.getByText("Yellow")).toBeInTheDocument();
    expect(screen.getAllByText("Coldplay")).toHaveLength(2);
    expect(screen.getByText("Parachutes")).toBeInTheDocument();
    expect(
      screen.getByText("A Rush of Blood to the Head")
    ).toBeInTheDocument();
  });

  test("agrega una canción a la biblioteca al hacer clic", () => {
    const store = renderSearchResults();

    const botones = screen.getAllByRole("button", {
      name: /Agregar a mi biblioteca/i
    });

    fireEvent.click(botones[0]);

    const state = store.getState();

    expect(state.library).toHaveLength(1);
    expect(state.library[0].title).toBe("Yellow");
  });
});
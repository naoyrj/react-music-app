import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "styled-components";

import Library from "../components/Library/Library";
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

const renderLibrary = (songs = []) => {
  const store = configureStore({
    reducer: {
      library: libraryReducer
    },
    preloadedState: {
      library: songs
    }
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Library />
      </ThemeProvider>
    </Provider>
  );

  return store;
};

describe("Library", () => {
  test("renderiza las canciones guardadas", () => {
    renderLibrary(mockSongs);

    expect(screen.getByText("Yellow")).toBeInTheDocument();
    expect(screen.getByText("Clocks")).toBeInTheDocument();
  });

  test("muestra un botón Eliminar por cada canción", () => {
    renderLibrary(mockSongs);

    const botones = screen.getAllByRole("button", {
      name: /Eliminar/i
    });

    expect(botones).toHaveLength(2);
  });

  test("elimina una canción al hacer clic en Eliminar", () => {
    const store = renderLibrary(mockSongs);

    const botones = screen.getAllByRole("button", {
      name: /Eliminar/i
    });

    fireEvent.click(botones[0]);

    const state = store.getState();

    expect(state.library).toHaveLength(1);
    expect(state.library[0].title).toBe("Clocks");
  });

  test("muestra un mensaje cuando la biblioteca está vacía", () => {
    renderLibrary([]);

    expect(
      screen.getByText(/no has agregado canciones/i)
    ).toBeInTheDocument();
  });
});
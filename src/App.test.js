import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import searchReducer from "./redux/slices/searchSlice";
import libraryReducer from "./redux/slices/librarySlice";
import theme from "./styles/theme";

const renderApp = () => {
  const store = configureStore({
    reducer: {
      search: searchReducer,
      library: libraryReducer
    }
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return store;
};

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza Header, SearchBar y Library", () => {
    renderApp();

    expect(
      screen.getByText(/Mi Biblioteca Musical/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "Escribe un artista, por ejemplo Coldplay"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Buscar/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Mi biblioteca")
    ).toBeInTheDocument();
  });

  test("realiza una búsqueda y muestra los resultados", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        album: [
          {
            idAlbum: "1",
            strAlbum: "Parachutes",
            strArtist: "Coldplay",
            intYearReleased: "2000"
          }
        ]
      })
    });

    renderApp();

    const input = screen.getByPlaceholderText(
      "Escribe un artista, por ejemplo Coldplay"
    );

    fireEvent.change(input, {
      target: { value: "Coldplay" }
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Buscar/i })
    );

    expect(
      await screen.findByRole("button", {
        name: /Agregar a mi biblioteca/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByText("Parachutes").length
    ).toBeGreaterThan(0);

    expect(
      screen.getByText("Coldplay")
    ).toBeInTheDocument();
  });

  test("agrega una canción de los resultados a la biblioteca", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        album: [
          {
            idAlbum: "1",
            strAlbum: "Parachutes",
            strArtist: "Coldplay",
            intYearReleased: "2000"
          }
        ]
      })
    });

    const store = renderApp();

    const input = screen.getByPlaceholderText(
      "Escribe un artista, por ejemplo Coldplay"
    );

    fireEvent.change(input, {
      target: { value: "Coldplay" }
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Buscar/i })
    );

    const addButton = await screen.findByRole(
      "button",
      {
        name: /Agregar a mi biblioteca/i
      }
    );

    fireEvent.click(addButton);

    expect(store.getState().library).toHaveLength(1);

    const libraryTitle = screen.getByText("Mi biblioteca");
    const librarySection = libraryTitle.closest("section");

    expect(
      within(librarySection).getAllByText("Parachutes").length
    ).toBeGreaterThan(0);

    expect(
      within(librarySection).getByText("Coldplay")
    ).toBeInTheDocument();

    expect(
      within(librarySection).getByRole("button", {
        name: /Eliminar/i
      })
    ).toBeInTheDocument();
  });
});
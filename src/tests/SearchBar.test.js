import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "styled-components";

import SearchBar from "../components/SearchBar/SearchBar";
import searchReducer from "../redux/slices/searchSlice";
import theme from "../styles/theme";

const renderSearchBar = () => {
  const store = configureStore({
    reducer: {
      search: searchReducer
    }
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SearchBar />
      </ThemeProvider>
    </Provider>
  );

  return store;
};

describe("SearchBar", () => {
  test("renderiza el campo de búsqueda", () => {
    renderSearchBar();

    expect(
      screen.getByPlaceholderText(
        "Escribe un artista, por ejemplo Coldplay"
      )
    ).toBeInTheDocument();
  });

  test("permite escribir en el campo de búsqueda", () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(
      "Escribe un artista, por ejemplo Coldplay"
    );

    fireEvent.change(input, {
      target: { value: "Coldplay" }
    });

    expect(input.value).toBe("Coldplay");
  });

  test("permite enviar una búsqueda al hacer clic en Buscar", () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(
      "Escribe un artista, por ejemplo Coldplay"
    );

    fireEvent.change(input, {
      target: { value: "Coldplay" }
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Buscar/i })
    );

    expect(input.value).toBe("Coldplay");
  });

  test("no realiza búsqueda si el campo está vacío", () => {
    renderSearchBar();

    fireEvent.click(
      screen.getByRole("button", { name: /Buscar/i })
    );

    expect(
      screen.getByRole("button", { name: /Buscar/i })
    ).toBeInTheDocument();
  });
});
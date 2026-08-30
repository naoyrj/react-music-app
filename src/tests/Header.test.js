import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Header from "../components/Header/Header";
import theme from "../styles/theme";

describe("Header", () => {
  test("muestra correctamente el título de la aplicación", () => {
    render(
      <ThemeProvider theme={theme}>
        <Header title="Biblioteca Musical" />
      </ThemeProvider>
    );

    expect(
      screen.getByText("Biblioteca Musical")
    ).toBeInTheDocument();
  });

  test("no muestra contenido adicional", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Header title="Biblioteca Musical" />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("Biblioteca Musical");
  });
});
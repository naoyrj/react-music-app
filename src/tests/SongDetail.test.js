import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import SongDetail from "../components/SongDetail/SongDetail";
import useFetch from "../hooks/useFetch";
import theme from "../styles/theme";

jest.mock("../hooks/useFetch");

const renderSongDetail = () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SongDetail />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe("SongDetail", () => {
  test("muestra el estado de carga", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      retry: jest.fn()
    });

    renderSongDetail();

    expect(
      screen.getByText("Cargando...")
    ).toBeInTheDocument();
  });

  test("muestra mensaje de error y permite reintentar", () => {
    const retryMock = jest.fn();

    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Error",
      retry: retryMock
    });

    renderSongDetail();

    expect(
      screen.getByText(/Hubo un problema al cargar los datos/i)
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Reintentar/i
      })
    );

    expect(retryMock).toHaveBeenCalledTimes(1);
  });

  test("muestra mensaje cuando no existe información del álbum", () => {
    useFetch.mockReturnValue({
      data: {
        album: null
      },
      loading: false,
      error: null,
      retry: jest.fn()
    });

    renderSongDetail();

    expect(
      screen.getByText(/No se encontr/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Volver al inicio/i
      })
    ).toBeInTheDocument();
  });

  test("muestra los datos completos del álbum", () => {
    useFetch.mockReturnValue({
      data: {
        album: [
          {
            strAlbum: "Parachutes",
            strArtist: "Coldplay",
            strAlbumThumb: "https://example.com/parachutes.jpg",
            intYearReleased: "2000",
            strGenre: "Alternative Rock",
            strDescriptionEN: "Primer álbum de estudio."
          }
        ]
      },
      loading: false,
      error: null,
      retry: jest.fn()
    });

    renderSongDetail();

    expect(
      screen.getAllByText("Parachutes").length
    ).toBeGreaterThan(0);

    expect(
      screen.getByText("Coldplay")
    ).toBeInTheDocument();

    expect(
      screen.getByText("2000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Alternative Rock")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Primer álbum de estudio.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Parachutes"
      })
    ).toBeInTheDocument();
  });

  test("muestra valores alternativos cuando faltan datos opcionales", () => {
    useFetch.mockReturnValue({
      data: {
        album: [
          {
            strAlbum: "Álbum desconocido",
            strArtist: "Artista",
            strAlbumThumb: null,
            intYearReleased: null,
            strGenre: null,
            strDescriptionEN: null
          }
        ]
      },
      loading: false,
      error: null,
      retry: jest.fn()
    });

    renderSongDetail();

    expect(
      screen.getAllByText("No disponible")
    ).toHaveLength(2);

    expect(
      screen.getByText("No hay descripción disponible.")
    ).toBeInTheDocument();
  });
});
import { renderHook, waitFor, act } from "@testing-library/react";
import useFetch from "../hooks/useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("no realiza petición si no recibe una URL", async () => {
    const { result } = renderHook(() => useFetch(""));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("obtiene datos correctamente", async () => {
    const mockData = {
      album: [
        {
          idAlbum: "1",
          strAlbum: "Parachutes"
        }
      ]
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() =>
      useFetch("https://example.com/api")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("guarda un error cuando la respuesta no es correcta", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false
    });

    const { result } = renderHook(() =>
      useFetch("https://example.com/api")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();

    expect(result.current.error).toBe(
      "No se pudo obtener la información."
    );
  });

  test("guarda el error cuando fetch falla", async () => {
    global.fetch.mockRejectedValueOnce(
      new Error("Error de conexión")
    );

    const { result } = renderHook(() =>
      useFetch("https://example.com/api")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Error de conexión"
    );
  });

  test("permite volver a realizar la petición con retry", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          album: [{ idAlbum: "1" }]
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          album: [{ idAlbum: "2" }]
        })
      });

    const { result } = renderHook(() =>
      useFetch("https://example.com/api")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  test("aborta la petición al desmontar el hook", () => {
    global.fetch.mockImplementation(
      () => new Promise(() => {})
    );

    const abortSpy = jest.spyOn(
      AbortController.prototype,
      "abort"
    );

    const { unmount } = renderHook(() =>
      useFetch("https://example.com/api")
    );

    unmount();

    expect(abortSpy).toHaveBeenCalled();

    abortSpy.mockRestore();
  });
});
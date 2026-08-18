import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./styles.css";

function SongDetail() {
  const { id } = useParams();

  const url = `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`;

  const {
    data,
    loading,
    error,
    retry
  } = useFetch(url);

  const album =
    data && data.album
      ? data.album[0]
      : null;

  if (loading) {
    return (
      <section className="song-detail">
        <p className="song-detail__message">
          Cargando...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="song-detail">
        <div className="song-detail__error">
          <p>
            Hubo un problema al cargar los datos.
          </p>

          <button onClick={retry}>
            Reintentar
          </button>

          <Link
            to="/"
            className="song-detail__back"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  if (!album) {
    return (
      <section className="song-detail">
        <p className="song-detail__message">
          No se encontró información del álbum.
        </p>

        <Link
          to="/"
          className="song-detail__back"
        >
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <section className="song-detail">
      <div className="song-detail__card">

        {album.strAlbumThumb && (
          <img
            src={album.strAlbumThumb}
            alt={album.strAlbum}
            className="song-detail__image"
          />
        )}

        <div className="song-detail__content">

          <h1>{album.strAlbum}</h1>

          <p>
            <strong>Artista:</strong>{" "}
            {album.strArtist}
          </p>

          <p>
            <strong>Álbum:</strong>{" "}
            {album.strAlbum}
          </p>

          <p>
            <strong>Año:</strong>{" "}
            {album.intYearReleased || "No disponible"}
          </p>

          <p>
            <strong>Género:</strong>{" "}
            {album.strGenre || "No disponible"}
          </p>

          <p>
            <strong>Descripción:</strong>{" "}
            {album.strDescriptionEN ||
              "No hay descripción disponible."}
          </p>

          <Link
            to="/"
            className="song-detail__back"
          >
            Volver al inicio
          </Link>

        </div>
      </div>
    </section>
  );
}

export default SongDetail;
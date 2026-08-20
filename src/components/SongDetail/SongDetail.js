import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import {
  DetailSection,
  DetailCard,
  AlbumImage,
  DetailContent,
  BackLink,
  DetailMessage,
  ErrorContainer,
  RetryButton
} from "./styles";

function SongDetail() {
  const { id } = useParams();

  const url =
    `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`;

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
      <DetailSection>
        <DetailMessage>Cargando...</DetailMessage>
      </DetailSection>
    );
  }

  if (error) {
    return (
      <DetailSection>
        <ErrorContainer>
          <p>
            Hubo un problema al cargar los datos.
          </p>

          <RetryButton onClick={retry}>
            Reintentar
          </RetryButton>

          <BackLink to="/">
            Volver al inicio
          </BackLink>
        </ErrorContainer>
      </DetailSection>
    );
  }

  if (!album) {
    return (
      <DetailSection>
        <DetailMessage>
          No se encontró información del álbum.
        </DetailMessage>

        <BackLink to="/">
          Volver al inicio
        </BackLink>
      </DetailSection>
    );
  }

  return (
    <DetailSection>
      <DetailCard>

        {album.strAlbumThumb && (
          <AlbumImage
            src={album.strAlbumThumb}
            alt={album.strAlbum}
          />
        )}

        <DetailContent>
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

          <BackLink to="/">
            Volver al inicio
          </BackLink>
        </DetailContent>

      </DetailCard>
    </DetailSection>
  );
}

export default SongDetail;
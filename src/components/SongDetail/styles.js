import styled from "styled-components";
import { Link } from "react-router-dom";

export const DetailSection = styled.section`
  width: 90%;
  max-width: 1000px;
  margin: 40px auto;
`;

export const DetailCard = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const AlbumImage = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  @media (max-width: 700px) {
    max-width: 350px;
    margin: 0 auto;
  }
`;

export const DetailContent = styled.div`
  h1 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    line-height: 1.6;
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.medium};
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const DetailMessage = styled.p`
  text-align: center;
  font-size: 18px;
`;

export const ErrorContainer = styled.div`
  text-align: center;
`;

export const RetryButton = styled.button`
  margin-right: ${({ theme }) => theme.spacing.small};
  padding: 10px 18px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
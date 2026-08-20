import styled from "styled-components";
import { Link } from "react-router-dom";

export const ResultsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.large};
`;

export const ResultsTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const ResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.medium};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const DetailLink = styled(Link)`
  display: block;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #444444;
  }
`;
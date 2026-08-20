import styled from "styled-components";

export const LibrarySection = styled.section`
  padding: ${({ theme }) => theme.spacing.large};
  background-color: #eeeeee;
`;

export const LibraryTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const LibraryList = styled.div`
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

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;
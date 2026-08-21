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

export const RemoveButton = styled.button`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.small};
  padding: 10px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    opacity: 0.85;
  }
`;
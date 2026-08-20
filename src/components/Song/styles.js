import styled from "styled-components";

export const SongCard = styled.article`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const SongTitle = styled.h2`
  margin-top: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SongInfo = styled.p`
  margin: 8px 0;
`;

export const SongButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.small};
  padding: 10px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textLight};
  color: ${({ theme }) => theme.colors.surface};
  cursor: ${({ $active }) => ($active ? "pointer" : "default")};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryDark : theme.colors.textLight};
  }
`;
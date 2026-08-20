import styled from "styled-components";

export const SearchForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  width: 90%;
  max-width: 700px;
  margin: ${({ theme }) => theme.spacing.large} auto;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #cccccc;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 16px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const SearchResponsive = styled.div`
  @media (max-width: 600px) {
    ${SearchForm} {
      flex-direction: column;
    }

    ${SearchButton} {
      width: 100%;
    }
  }
`;
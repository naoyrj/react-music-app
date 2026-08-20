import styled from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
`;

export const Main = styled.main`
  width: 100%;
`;

export const AppMessage = styled.p`
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 18px;
`;

export const ErrorBox = styled.div`
  width: 90%;
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing.large} auto;
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  background-color: #ffe5e5;
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  p {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const RetryButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
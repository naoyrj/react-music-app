import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
`;
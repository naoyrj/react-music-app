import React from "react";
import {
  HeaderContainer,
  HeaderTitle
} from "./styles";

function Header({ title }) {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
}

export default Header;
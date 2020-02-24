import styled, { ThemeProvider } from "styled-components";
import React from "react";
import { colors } from "../utils";
import { PrimaryButton, SecondaryButton } from "../utils/Button";
import { Link } from "react-router-dom";
const NavMenu = () => {
  return (
    <div>
      <StyledNavBackground>
        <Link to="/home">
          <PrimaryButton>home</PrimaryButton>
        </Link>
        <Link to="/funding">
          <PrimaryButton>Funding</PrimaryButton>
        </Link>
        <Link to="/ai">
          <PrimaryButton>AI</PrimaryButton>
        </Link>
      </StyledNavBackground>
    </div>
  );
};

const StyledNavBackground = styled.div`
  background-color: ${colors.navColor};
  width: vw;
`;

export default NavMenu;

import styled, { ThemeProvider } from "styled-components";
import React from "react";
import bitmexlogo from "../bitmexlogocropped.png";
const Home = () => {
  return (
    <div>
      <RedContainer></RedContainer>
      <BlueContainer></BlueContainer>
      <LogoSpan>
        <img src={bitmexlogo} width="40" height="25" alt="mexLogo" />
      </LogoSpan>
    </div>
  );
};

export default Home;

const RedContainer = styled.div`
  background: #a83246;
  width: vw;
  height: 46.2vh;
`;
const BlueContainer = styled.div`
  background: #38139e;
  width: vw;
  height: 45vh;
`;

const LogoSpan = styled.span`
  position: absolute;
  top: 52%;
  left: 48%;
  &:hover {
    animation: rotate 0.8s linear infinite;
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`;

import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";
import { colors } from "./Colors";

const Spinner = () => {
  return (
    <div>
      <StyledSpinner color={colors.pink}></StyledSpinner>;
    </div>
  );
};

export default Spinner;

const StyledSpinner = styled(PacmanLoader)``;

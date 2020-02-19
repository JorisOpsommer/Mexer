import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";

const Spinner = () => {
  return (
    <div>
      <StyledSpinner></StyledSpinner>;
    </div>
  );
};

export default Spinner;

const StyledSpinner = styled(PacmanLoader)`
  color: blue;
  margin-left: 500px;
`;

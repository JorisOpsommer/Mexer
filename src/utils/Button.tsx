import * as React from "react";
import styled from "styled-components";
import { colors } from "./Colors";

const Button = styled.button`
  color: ${colors.white};
  border: 2px solid ${colors.transparent};
  background: ${colors.pink};
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  outline: none;
  &:hover {
    background-color: ${colors.pinkHover};
  }
  &:active {
    transform: translate(+0%, +1%) scale(1.03);
  }
`;

export const PrimaryButton = styled(Button)``;
export const SecondaryButton = styled(Button)`
  color: ${colors.pink};
  background: ${colors.white};
  border: 2px solid ${colors.pink};
  &:hover {
    background-color: ${colors.navColor};
  }
`;
export const SecondaryButtonNoMargin = styled(SecondaryButton)`
  margin: 0rem;
`;

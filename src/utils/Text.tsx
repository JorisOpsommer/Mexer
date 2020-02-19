import React from "react";
import styled from "styled-components";
import { colors } from "./Colors";

type TextProps = {
  text: string;
};

const Text = (props: TextProps) => {
  const labelText = props.text;
  return (
    <div>
      <Textfield>{labelText}</Textfield>
    </div>
  );
};

export default Text;

const Textfield = styled.div`
  border-radius: 3px;
  background-color: ${colors.white};
  border: 1px solid #d2cfcf;
  padding: 4px 5px;
  margin-bottom: 5px;
`;

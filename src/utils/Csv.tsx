import { IFundingAndTrade } from "../models";
import React from "react";
import styled from "styled-components";
import { SecondaryButton, SecondaryButtonNoMargin } from "./Button";
import { CSVLink, CSVDownload } from "react-csv";

type csvProps = {
  fundingAndTrade: IFundingAndTrade[];
};
const Csv = (props: csvProps) => {
  return (
    <div>
      {console.log("in csv")}
      <CSVLink
        data={props.fundingAndTrade}
        filename={"my-file.csv"}
        asyncOnClick={true}
        onClick={(event, done) => {
          done(); // REQUIRED to invoke the logic of component
        }}
      >
        <br />
        <SecondaryButtonNoMargin>Download</SecondaryButtonNoMargin>
      </CSVLink>
    </div>
  );
};
export default Csv;

const StyledCsvLink = styled.button`
  margin-left: 1rem;
`;

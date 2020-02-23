import { IFundingAndTrade } from "../models";
import React from "react";
import styled from "styled-components";
import { SecondaryButton, SecondaryButtonNoMargin } from "./Button";
import { CSVLink, CSVDownload } from "react-csv";

type csvProps = {
  fundingAndTrade: any;
};
const Csv = (props: csvProps) => {
  return (
    <div>
      {props.fundingAndTrade === "clearCSV" ? (
        <div></div>
      ) : (
        <div>
          <CSVLink
            data={props.fundingAndTrade}
            filename={"mexerdata.csv"}
            asyncOnClick={true}
          >
            <br />
            <SecondaryButtonNoMargin>Download</SecondaryButtonNoMargin>
          </CSVLink>
        </div>
      )}
    </div>
  );
};
export default Csv;

const StyledCsvLink = styled.button`
  margin-left: 1rem;
`;

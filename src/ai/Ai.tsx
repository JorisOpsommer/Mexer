import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "../utils/Button";
import Spinner from "../utils/Spinner";
import Text from "../utils/Text";

const Ai = () => {
  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<any>(new Date());
  let [isLoading, setLoading] = React.useState(false);
  let [actionsToFetch, setActionsToFetch] = React.useState(0);
  const FetchData = (startDate: Date, endDate: Date) => {
    console.log("fetch data");
    setLoading(true);
    setActionsToFetch(500);
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            customInput={<PrimaryButtonInput />}
            dateFormat="yyyy/MM/dd"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            customInput={<PrimaryButtonInput />}
            dateFormat="yyyy/MM/dd"
          />
          <div>
            <PrimaryButton onClick={() => FetchData(startDate, endDate)}>
              Fetch
            </PrimaryButton>
          </div>
          <StyledSpinner>
            <Spinner></Spinner>
            <Text text="df"></Text>
          </StyledSpinner>
        </div>
      )}
    </div>
  );
};

export default Ai;

const PrimaryButtonInput = ({ value, onClick }: any) => {
  return <SecondaryButton onClick={onClick}>{value}</SecondaryButton>;
};

const StyledSpinner = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
`;

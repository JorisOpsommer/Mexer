import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "../utils/Button";
import Spinner from "../utils/Spinner";

const Ai = () => {
  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<any>(new Date());
  let [loading, setLoading] = React.useState(false);

  const FetchData = (startDate: Date, endDate: Date) => {
    //fetch data
  };
  useEffect(() => {
    if (!loading)
      return () => {
        console.log("spinner");
      };
  }, [loading]);

  return (
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
      <Spinner />
    </div>
  );
};

export default Ai;

const PrimaryButtonInput = ({ value, onClick }: any) => {
  return <SecondaryButton onClick={onClick}>{value}</SecondaryButton>;
};

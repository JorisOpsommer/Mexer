import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "../utils/Button";
import Spinner from "../utils/Spinner";
import Text from "../utils/Text";
import ApiGetCallAxios from "../api/Apiclient";
import { IFunding, ITrades } from "../models";
import moment from "moment";
import readableDate from "../utils/readable-date";
const axios = require("axios");

const Ai = () => {
  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<any>(new Date());
  let [isLoading, setLoading] = React.useState(false);
  let [actionsLeftUntilTimeout, setactionsLeftUntilTimeout] = React.useState(0);
  const FetchData = async (startDate: Date, endDate: Date) => {
    setLoading(true);
    let fundings: IFunding[] = [];
    let trades: ITrades[] = [];
    setactionsLeftUntilTimeout(5);
    let mexStartIndex = 0;
    let readableStartDate = readableDate(startDate);
    let readableEndDate = readableDate(endDate);

    console.log("actionslefttofetch " + actionsLeftUntilTimeout);

    fundings = await FetchFunding(
      actionsLeftUntilTimeout,
      readableStartDate,
      readableEndDate,
      mexStartIndex
    );
    console.log(
      "actionslefttofetch doing trades now: " + actionsLeftUntilTimeout
    );

    trades = await FetchTrades(
      actionsLeftUntilTimeout,
      readableStartDate,
      readableEndDate,
      mexStartIndex
    );
    console.log("actionslefttofetch " + actionsLeftUntilTimeout);

    console.log("final result");
    console.log(fundings);
    console.log(trades);
    setLoading(false);
  };

  const FetchFunding = async (
    actionsleft: number,
    readableStartDate: string,
    readableEndDate: string,
    mexStartIndex: number
  ): Promise<IFunding[]> => {
    let dataToFetch = true;
    let fundings: IFunding[] = [];

    while (actionsleft > 0 && dataToFetch) {
      actionsleft -= 1;
      let fundingCall = await CallToApi(
        readableStartDate,
        readableEndDate,
        mexStartIndex.toString(),
        "/api/v1/funding?symbol=XBT&count=500"
      );
      mexStartIndex += 500;

      console.log(fundingCall);
      if (fundingCall.length === 0 || fundingCall.length === undefined) {
        dataToFetch = false;
      }

      fundingCall.forEach(element => {
        fundings.push(element);
      });
    }
    setactionsLeftUntilTimeout(actionsleft);
    return fundings;
  };

  const FetchTrades = async (
    actionsleft: number,
    readableStartDate: string,
    readableEndDate: string,
    mexStartIndex: number
  ): Promise<ITrades[]> => {
    let dataToFetch = true;
    let trades: ITrades[] = [];

    while (actionsleft > 0 && dataToFetch) {
      actionsleft -= 1;
      let tradingCall = await CallToApi(
        readableStartDate,
        readableEndDate,
        mexStartIndex.toString(),
        "/api/v1/trade/bucketed?binSize=1h&partial=false&symbol=XBT&count=500"
      );
      mexStartIndex += 500;

      console.log(tradingCall);
      if (tradingCall.length === 0 || tradingCall.length === undefined) {
        dataToFetch = false;
      }

      tradingCall.forEach(element => {
        trades.push(element);
      });
    }
    setactionsLeftUntilTimeout(actionsleft);
    return trades;
  };

  const CallToApi = async (
    readableStartdate: string,
    readableEndDate: string,
    mexStartIndex: string,
    url: string
  ): Promise<IFunding[]> => {
    return await ApiGetCallAxios(
      url +
        "&start=" +
        mexStartIndex +
        "&startTime=" +
        readableStartdate +
        "&endTime=" +
        readableEndDate
    ).then(fund => {
      return fund;
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <StyledSpinner>
            <Spinner></Spinner>
            <br />
            <Text text={actionsLeftUntilTimeout.toString()}></Text>
          </StyledSpinner>
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

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
  let [actionsToFetch, setActionsToFetch] = React.useState(0);
  const FetchData = async (startDate: Date, endDate: Date) => {
    let fundings: IFunding[] = [];
    let actionsleft = 5;
    let mexStartIndex = 0;
    let readableStartDate = readableDate(startDate);
    let readableEndDate = readableDate(endDate);
    let dataToFetch = true;

    fundings = await FetchFunding(
      actionsleft,
      readableStartDate,
      readableEndDate,
      mexStartIndex
    );

    console.log("final result");
    console.log(fundings);
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
    return trades;
  };

  // const FetchFunding = async (
  //   mexStartIndex: number,
  //   actionsleft: number,
  //   readableStartDate: string,
  //   readableEndDate: string,
  //   dataToFetch: boolean,
  //   fundings: IFunding[]
  // ): Promise<IFunding[] | any> => {
  //   if (!dataToFetch) {
  //     return fundings;
  //   } else {
  //     setTimeout(async function() {
  //       while (actionsleft > 0) {
  //         actionsleft -= 1;

  //         let fundingCall = await CallToApi(
  //           readableStartDate,
  //           readableEndDate,
  //           mexStartIndex.toString(),
  //           "/api/v1/funding?symbol=XBT&count=500"
  //         );
  //         console.log("logging result:");

  //         console.log(fundingCall);
  //         if (fundingCall.length === 0 || fundingCall.length === undefined) {
  //           dataToFetch = false;
  //         }
  //         fundingCall.forEach(element => {
  //           fundings.push(element);
  //         });
  //         console.log("logging total result");
  //         console.log(fundings);
  //       }

  //       FetchFunding(
  //         mexStartIndex + 500,
  //         5,
  //         readableStartDate,
  //         readableEndDate,
  //         dataToFetch,
  //         fundings
  //       );
  //     }, 8000);
  //   }
  // };

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
            <Text text={actionsToFetch.toString()}></Text>
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

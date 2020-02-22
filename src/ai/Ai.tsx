import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "../utils/Button";
import Spinner from "../utils/Spinner";
import Text from "../utils/Text";
import ApiGetCallAxios from "../api/Apiclient";
import { IFunding, ITrade, IFundingAndTrade } from "../models";
import readableDate from "../utils/readable-date";
import Combiner from "../utils/Combiner";
import { MultiplierFunding, MultiplierTrades } from "../utils";

const Ai = () => {
  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<any>(new Date());
  let [isLoading, setLoading] = React.useState(false);
  let [actionsLeftUntilTimeout, setactionsLeftUntilTimeout] = React.useState(0);
  let [wasAllDataFechted, setWasAllDataFechted] = React.useState(true);

  const FetchData = async (startDate: Date, endDate: Date) => {
    setLoading(true);
    let fundings: IFunding[] = [];
    let trades: ITrade[] = [];
    setactionsLeftUntilTimeout(29);
    let actionsLeftUntilTime = 29;
    let mexStartIndex = 0;
    let readableStartDate = readableDate(startDate);
    let readableEndDate = readableDate(endDate);
    let result: IFundingAndTrade[] = [];
    fundings = await FetchFunding(
      actionsLeftUntilTime,
      readableStartDate,
      readableEndDate,
      mexStartIndex
    );

    trades = await FetchTrades(
      actionsLeftUntilTime - Math.ceil(fundings.length / 500),
      readableStartDate,
      readableEndDate,
      mexStartIndex
    );
    setLoading(false);
    //multiplay funding to have equal data
    fundings = MultiplierFunding("1h", fundings);
    trades = MultiplierTrades("1h", trades);
    result = Combiner(fundings, trades);
    console.log(result);
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
      let fundingCall = await CallToApi(
        readableStartDate,
        readableEndDate,
        mexStartIndex.toString(),
        "/api/v1/funding?symbol=XBT&count=500"
      );
      mexStartIndex += 500;

      if (fundingCall.length === 0 || fundingCall.length === undefined) {
        dataToFetch = false;
      }

      fundingCall.forEach(element => {
        fundings.push(element);
      });
      setactionsLeftUntilTimeout(actionsleft);
      actionsleft -= 1;
    }
    if (actionsleft === 0) setWasAllDataFechted(false);
    return fundings;
  };

  const FetchTrades = async (
    actionsleft: number,
    readableStartDate: string,
    readableEndDate: string,
    mexStartIndex: number
  ): Promise<ITrade[]> => {
    let dataToFetch = true;
    let trades: ITrade[] = [];

    while (actionsleft > 0 && dataToFetch) {
      let tradingCall = await CallToApi(
        readableStartDate,
        readableEndDate,
        mexStartIndex.toString(),
        "/api/v1/trade/bucketed?binSize=1h&partial=false&symbol=XBT&count=500"
      );
      mexStartIndex += 500;

      if (tradingCall.length === 0 || tradingCall.length === undefined) {
        dataToFetch = false;
      }

      tradingCall.forEach(element => {
        trades.push(element);
      });
      setactionsLeftUntilTimeout(actionsleft);
      actionsleft -= 1;
    }
    if (actionsleft === 0) setWasAllDataFechted(false);
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
          <>
            {30 - actionsLeftUntilTimeout !== 30 ? (
              <StyledContent>
                <Text
                  text={
                    (30 - actionsLeftUntilTimeout).toString() +
                    " actions fetched."
                  }
                ></Text>
                {wasAllDataFechted ? (
                  <></>
                ) : (
                  <StyledContent>
                    <br />
                    <Text text="Warning not all the data was fetched."></Text>
                  </StyledContent>
                )}
              </StyledContent>
            ) : (
              <></>
            )}
          </>
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

const StyledContent = styled.div`
  margin-left: 1rem;
`;

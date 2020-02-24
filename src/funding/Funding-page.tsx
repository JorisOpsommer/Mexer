import React, { useEffect } from "react";
import Text from "../utils/Text";
import { IFundingAndTrade, ITrade, IFunding } from "../models";
import ApiGetCallAxios from "../api/Apiclient";
import { MultiplierFunding, MultiplierTrades } from "../utils";
import Combiner from "../utils/Combiner";
import readableDate from "../utils/readable-date";
import Spinner from "../utils/Spinner";
import styled from "styled-components";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import Cutter from "../utils/Cutter";

const FundingPage = () => {
  const [data, setData] = React.useState<IFundingAndTrade[]>();
  const [startDate, setStartDate] = React.useState<any>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = React.useState<any>(new Date());
  let [isLoading, setLoading] = React.useState(true);
  let [actionsLeftUntilTimeout, setactionsLeftUntilTimeout] = React.useState(
    29
  );

  const FetchFundingCharts = async (
    actionsleft: number,
    readableStartDate: string,
    readableEndDate: string,
    mexStartIndex: number
  ): Promise<IFunding[]> => {
    let dataToFetch = true;
    let fundings: IFunding[] = [];

    while (actionsleft > 0 && dataToFetch) {
      let fundingCall = await CallToApiCharts(
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
    return fundings;
  };

  const FetchTradesCharts = async (
    actionsleft: number,
    readableStartDate: string,
    readableEndDate: string,
    mexStartIndex: number
  ): Promise<ITrade[]> => {
    let dataToFetch = true;
    let trades: ITrade[] = [];

    while (actionsleft > 0 && dataToFetch) {
      let tradingCall = await CallToApiCharts(
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
    return trades;
  };

  const OnInit = async () => {
    let trades: ITrade[] = [];
    let fundings: IFunding[] = [];
    let result: IFundingAndTrade[] = [];

    setLoading(true);
    let actionsLeftUntilTime = 29;
    let mexStartIndex = 0;
    let readableStartDate = readableDate(startDate);
    let readableEndDate = readableDate(endDate);
    fundings = await FetchFundingCharts(
      actionsLeftUntilTime,
      readableStartDate,
      readableEndDate,
      mexStartIndex
    );

    trades = await FetchTradesCharts(
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
    console.log(result.length);
    result = Cutter(result);
    console.log(result.length);
    ResultToChartData(result);
  };
  const ResultToChartData = (mexData: IFundingAndTrade[]) => {
    let chartDataArray: any[] = [];

    mexData.forEach(element => {
      let chartData: any = {};
      chartData.name = element.timestampTrade;
      chartData.trade = element.openTrade;
      chartData.funding = element.fundingRateFunding;
      chartDataArray.push(chartData);
    });

    setData(chartDataArray);
  };

  const CallToApiCharts = async (
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
  useEffect(() => {
    OnInit();
  }, []);

  return (
    <div>
      <Text text="1 hour graph"></Text>
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
          <LineChart
            width={1500}
            height={450}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="trade" />
            <YAxis yAxisId="funding" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="trade"
              type="monotone"
              dataKey="trade"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="funding"
              type="monotone"
              dataKey="funding"
              stroke="#82ca9d"
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};
export default FundingPage;

const StyledSpinner = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
`;

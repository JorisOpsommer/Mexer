import React, { useEffect } from "react";
import { ApiGetCallAxiosForTensorCharts } from "../api/Apiclient";
import Spinner from "../utils/Spinner";
import styled from "styled-components";
import Text from "../utils/Text";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import { OiChart } from "../utils";
import moment from "moment";

const Oi = () => {
  let [chartdataShortTerm, setChartdataShortTerm] = React.useState<any>();
  let [chartdataLongTerm, setChartdataLongTerm] = React.useState<any>();
  let [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    OnIit();
  }, []);

  const OnIit = async () => {
    let dataShortTerm: any[] = [];
    let dataLongTerm: any[] = [];
    setLoading(true);
    dataShortTerm = await FetchDataShortTerm();
    dataLongTerm = await FetchDataLongTerm();

    const resultShortTerm = FetchedDataToChartData(dataShortTerm);
    const resultLongTerm = FetchedDataToChartData(dataLongTerm);
    setChartdataShortTerm(resultShortTerm);
    setChartdataLongTerm(resultLongTerm);
    setLoading(false);
  };

  const FetchDataShortTerm = async () => {
    return await ApiGetCallAxiosForTensorCharts("/bitmexStats/1h/0");
  };
  const FetchDataLongTerm = async () => {
    return await ApiGetCallAxiosForTensorCharts("/bitmexStats/1d/0");
  };
  const FetchedDataToChartData = (data: any[]) => {
    let res: any[] = [];
    data.forEach(element => {
      let temp: any = {};
      temp.date = moment(element.timestamp).format("DD/MM");
      temp.oi = element.openInterest[0] / 1000 / 1000;
      temp.price = element.price[0];
      res.push(temp);
    });
    return res;
  };
  return (
    <div>
      {isLoading ? (
        <div>
          <StyledSpinner>
            <Spinner></Spinner>
          </StyledSpinner>
        </div>
      ) : (
        <div>
          <StyledChart>
            <Text text="Daily chart"></Text>
            <OiChart chartData={chartdataLongTerm}></OiChart>
            <Text text="Hourly chart"></Text>
            <OiChart chartData={chartdataShortTerm}></OiChart>
          </StyledChart>
        </div>
      )}
    </div>
  );
};

export default Oi;

const StyledSpinner = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
`;
const StyledChart = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
`;

import React, { useEffect } from "react";
import { ApiGetCallAxiosForTensorCharts } from "../api/Apiclient";
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
import { OiChart } from "../utils";
import moment from "moment";

const Oi = () => {
  let [chartdata, setChartdata] = React.useState<any>();
  let [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    OnIit();
  }, []);

  const OnIit = async () => {
    let data: any[] = [];
    data = await FetchData();

    const result = FetchedDataToChartData(data);
    setChartdata(result);
    setLoading(false);
  };

  const FetchData = async () => {
    return await ApiGetCallAxiosForTensorCharts("/bitmexStats/1h/0");
  };
  const FetchedDataToChartData = (data: any[]) => {
    let res: any[] = [];
    data.forEach(element => {
      let temp: any = {};
      temp.date = moment(element.timestamp).format("DD/MM");
      temp.oi = element.openInterest[0];
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
            <OiChart chartData={chartdata}></OiChart>
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
  margin-left: 2rem;
  margin-top: 1rem;
`;

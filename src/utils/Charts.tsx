import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import { IFundingAndTrade } from "../models";

type chartProps = {
  chartData: IFundingAndTrade[] | undefined;
};

const FundingChart = (props: chartProps) => {
  return (
    <div>
      <LineChart
        width={1500}
        height={450}
        data={props.chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="trade" domain={["auto", "auto"]} orientation="right" />
        <YAxis yAxisId="funding" orientation="left" domain={["auto", "auto"]} />
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
  );
};
export default FundingChart;

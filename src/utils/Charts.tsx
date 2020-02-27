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

type chartPropsFunding = {
  chartData: IFundingAndTrade[] | undefined;
};

type chartPropsOi = {
  chartData: any[] | undefined;
};
export const FundingChart = (props: chartPropsFunding) => {
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
        <YAxis yAxisId="price" domain={["auto", "auto"]} orientation="right" />
        <YAxis yAxisId="funding" orientation="left" domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="price"
          type="monotone"
          dataKey="price"
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

export const OiChart = (props: chartPropsOi) => {
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
        <XAxis dataKey="date" />
        <YAxis yAxisId="price" domain={["auto", "auto"]} orientation="right" />
        <YAxis yAxisId="oi" orientation="left" domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="price"
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="oi" type="monotone" dataKey="oi" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

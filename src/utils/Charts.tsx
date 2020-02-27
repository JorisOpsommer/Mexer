import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  Bar
} from "recharts";
import { IFundingAndTrade } from "../models";

type chartPropsFunding = {
  chartData: IFundingAndTrade[] | undefined;
};

type chartPropsOi = {
  chartData: any[] | undefined;
};

type chartPropsOrderbook = {
  chartData: any[] | undefined;
  colorBars: string;
  colorArea: string;
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

export const OrderbookChart = (props: chartPropsOrderbook) => {
  return (
    <div>
      <ComposedChart
        width={1500}
        height={450}
        data={props.chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="price" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="total"
          fill={props.colorArea}
          stroke={props.colorArea}
        />
        <Bar dataKey="size" barSize={20} fill={props.colorBars} />
      </ComposedChart>
    </div>
  );
};

import React from "react";
import { ApiGetCallAxiosForBitmex } from "../api";
import { OrderbookChart, colors } from "../utils";
import Spinner from "../utils/Spinner";
import styled from "styled-components";

const Orderbook = () => {
  let [chartdataBuys, setChartDataBuys] = React.useState<any>();
  let [chartdataSells, setChartDataSells] = React.useState<any>();
  let [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    OnInit();
  }, []);

  const OnInit = async () => {
    setLoading(true);

    const data = await FetchData();
    const resBuys = DataToChart(data, "Buy");
    const resSells = DataToChart(data, "Sell");

    setChartDataBuys(resBuys);
    setChartDataSells(resSells);
    setLoading(false);
  };
  const FetchData = async () => {
    return await ApiGetCallAxiosForBitmex(
      "/api/v1/orderBook/L2?symbol=XBT&depth=200"
    );
  };
  const DataToChart = (data: any[], side: string) => {
    let res: any[] = [];
    let total: number = 0;

    data.forEach(element => {
      if (element.side === side) {
        let temp: any = {};
        temp.price = element.price;
        temp.size = element.size;
        total += element.size;
        temp.total = total / 10;
        res.push(temp);
      }
    });
    // if (side === "Sell") res.reverse();
    res.reverse();
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
          <OrderbookChart
            chartData={chartdataSells}
            colorBars={colors.sellBars}
            colorArea={colors.sellArea}
          ></OrderbookChart>
          <OrderbookChart
            chartData={chartdataBuys}
            colorBars={colors.buyBars}
            colorArea={colors.buyArea}
          ></OrderbookChart>
        </div>
      )}
    </div>
  );
};
export default Orderbook;
const StyledSpinner = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
`;
const StyledChart = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
`;

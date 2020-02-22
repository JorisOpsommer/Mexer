import { IFunding, ITrade, IFundingAndTrade } from "../models";

const Combiner = (
  fundings: IFunding[],
  trades: ITrade[]
): IFundingAndTrade[] => {
  let fundingAndTrade: IFundingAndTrade[] = [];
  for (let i = 0; i < fundings.length; i++) {
    let fAT: IFundingAndTrade = {};
    fAT.fundingIntervalFunding = fundings[i].fundingInterval;
    fAT.fundingRateFunding = fundings[i].fundingRate;
    fAT.fundingRateDailyFunding = fundings[i].fundingRateDaily;
    fAT.symbolFunding = fundings[i].symbol;
    fAT.timestampFunding = fundings[i].timestamp;

    //trades
    fAT.closeTrade = trades[i].close;
    fAT.foreignNotionalTrade = trades[i].foreignNotional;
    fAT.highTrade = trades[i].high;
    fAT.homeNotionalTrade = trades[i].homeNotional;
    fAT.lastSizeTrade = trades[i].lastSize;
    fAT.lowTrade = trades[i].low;
    fAT.openTrade = trades[i].open;
    fAT.symbolTrade = trades[i].symbol;
    fAT.timestampTrade = trades[i].timestamp;
    fAT.tradesTrade = trades[i].trades;
    fAT.turnoverTrade = trades[i].turnover;
    fAT.volumeTrade = trades[i].volume;
    fAT.vwapTrade = trades[i].vwap;

    //map to 1 object
    fundingAndTrade.push(fAT);
  }
  return fundingAndTrade;
};
export default Combiner;

import { IFunding, ITrade, IFundingAndTrade } from "../models";

const Combiner = (
  fundings: IFunding[],
  trades: ITrade[]
): IFundingAndTrade[] => {
  let fundingAndTrade: IFundingAndTrade[] = [];
  for (let i = 0; i < fundings.length; i++) {
    let fAT: IFundingAndTrade = {};
    // fAT.fundingIntervalFunding = fundings[i].fundingInterval;
    fAT.timestampFunding = fundings[i].timestamp;
    fAT.timestampTrade = trades[i].timestamp;
    fAT.fundingRateFunding = fundings[i].fundingRate;
    fAT.fundingRateDailyFunding = fundings[i].fundingRateDaily;

    fAT.openTrade = trades[i].open;
    fAT.closeTrade = trades[i].close;
    fAT.highTrade = trades[i].high;
    fAT.lowTrade = trades[i].low;

    fAT.volumeTrade = trades[i].volume;
    fAT.tradesTrade = trades[i].trades;

    fAT.vwapTrade = trades[i].vwap;
    fAT.turnoverTrade = trades[i].turnover;
    fAT.homeNotionalTrade = trades[i].homeNotional;
    fAT.foreignNotionalTrade = trades[i].foreignNotional;
    fAT.lastSizeTrade = trades[i].lastSize;
    fAT.symbolFunding = fundings[i].symbol;
    fAT.symbolTrade = trades[i].symbol;

    //map to 1 object
    fundingAndTrade.push(fAT);
  }
  return fundingAndTrade;
};
export default Combiner;

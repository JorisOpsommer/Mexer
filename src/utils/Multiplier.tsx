import { IFunding, ITrade } from "../models";

export const MultiplierFunding = (
  timeframe: string,
  fundings: IFunding[]
): IFunding[] => {
  let newFundings: IFunding[] = [];

  if (timeframe === "1h") {
    fundings.forEach(element => {
      for (let i = 0; i < 8; i++) {
        newFundings.push(element);
      }
    });
    newFundings.pop();
    newFundings.pop();
    newFundings.pop();
    newFundings.pop();
  } else {
    newFundings = fundings;
  }
  return newFundings;
};

export const MultiplierTrades = (
  timeframe: string,
  trades: ITrade[]
): IFunding[] => {
  let newTrades: ITrade[] = [];

  if (timeframe === "1h") {
    for (let i = 0; i < trades.length; i++) {
      if (i >= 4) newTrades.push(trades[i]);
    }
  } else {
    newTrades = trades;
  }
  return newTrades;
};

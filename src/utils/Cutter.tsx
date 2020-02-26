import { IFundingAndTrade } from "../models";

export const CutterMod8 = (data: IFundingAndTrade[]): IFundingAndTrade[] => {
  let newData: IFundingAndTrade[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 8 === 0) newData.push(data[i]);
  }
  return newData;
};

export const CutterMod8LastIncluded = (
  data: IFundingAndTrade[]
): IFundingAndTrade[] => {
  let newData: IFundingAndTrade[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 8 === 0) newData.push(data[i]);
  }
  return newData;
};

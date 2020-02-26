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
  if (data.length - (1 % 8) !== 0) newData.push(data[data.length - 1]);
  return newData;
};

export const CutterLast10Percent = (
  data: IFundingAndTrade[]
): IFundingAndTrade[] => {
  let newData: IFundingAndTrade[] = [];
  const last10Percent = data.length - 24;
  for (let i = 0; i < data.length; i++) {
    if (i >= last10Percent) newData.push(data[i]);
  }
  return newData;
};

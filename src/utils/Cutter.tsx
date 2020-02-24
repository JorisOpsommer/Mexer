import { IFundingAndTrade } from "../models";

const Cutter = (data: IFundingAndTrade[]): IFundingAndTrade[] => {
  let newData: IFundingAndTrade[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 8 === 0) newData.push(data[i]);
  }
  return newData;
};
export default Cutter;

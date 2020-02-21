import { IFunding, ITrade } from "../models";

const Multiplier = (
  timeframe: string,
  fundings: IFunding[],
  trades: ITrade[]
): IFunding[] => {
  let newFundings: IFunding[] = [];

  if (timeframe === "h1") {
    fundings.forEach(element => {
      for (let i = 0; i < 8; i++) {
        newFundings.push(element);
      }
    });
  } else {
    newFundings = fundings;
  }
  return newFundings;
};
export default Multiplier;

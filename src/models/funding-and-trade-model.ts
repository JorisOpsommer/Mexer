export interface IFundingAndTrade {
  timestampFunding?: Date;
  symbolFunding?: string;
  fundingIntervalFunding?: Date;
  fundingRateFunding?: number;
  fundingRateDailyFunding?: number;
  timestampTrade?: Date;
  symbolTrade?: string;
  openTrade?: number;
  highTrade?: number;
  lowTrade?: number;
  closeTrade?: number;
  tradesTrade?: number;
  volumeTrade?: number;
  vwapTrade?: number;
  lastSizeTrade?: number;
  turnoverTrade?: number;
  homeNotionalTrade?: number;
  foreignNotionalTrade?: number;
}

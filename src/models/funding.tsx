import React from "react";

export interface IFunding {
  timestamp?: Date;
  symbol?: string;
  fundingInterval?: Date;
  fundingRate?: number;
  fundingRateDaily?: number;
}

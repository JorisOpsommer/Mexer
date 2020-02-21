export interface ITrade {
  timestamp?: Date;
  symbol?: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  trades?: number;
  volume?: number;
  vwap?: number;
  lastSize?: number;
  turnover?: number;
  homeNotional?: number;
  foreignNotional?: number;
}

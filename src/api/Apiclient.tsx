import React from "react";
const axios = require("axios");

export const ApiGetCallAxios = async (url: string): Promise<any> => {
  return axios.get(url).then(function(response: any) {
    return response.data;
  });
};

export const ApiGetCallAxiosForBitmex = async (url: string): Promise<any> => {
  const baseUrl =
    "https://backendjoris20200226014040.azurewebsites.net/api/bitmex?url=";
  const baseBitmexUrl = encodeURIComponent("https://www.bitmex.com");
  const encodedQueryUrl = encodeURIComponent(url);

  return axios
    .get(baseUrl + baseBitmexUrl + encodedQueryUrl)
    .then(function(response: any) {
      return response.data;
    });
};

export const ApiGetCallAxiosForTensorCharts = async (
  url: string
): Promise<any> => {
  const baseUrl =
    "https://backendjoris20200226014040.azurewebsites.net/api/bitmex?url=";
  const baseTensorUrl = "https://www.tensorcharts.com/tensor/bitmex/XBTUSD";

  return axios.get(baseUrl + baseTensorUrl + url).then(function(response: any) {
    return response.data;
  });
};

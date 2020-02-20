import React from "react";
const axios = require("axios");

const ApiGetCallAxios = async (url: string): Promise<any> => {
  return axios.get(url).then(function(response: any) {
    return response.data;
  });
};

export default ApiGetCallAxios;

import React from "react";
const axios = require("axios");

const ApiGetCallAxios = async (url: string): Promise<any> => {
  axios.get(url).then(function(response: any) {
    // handle success
    console.log("in api client");
    console.log(response.data);
    return response.data;
  });
};

export default ApiGetCallAxios;

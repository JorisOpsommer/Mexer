import React from "react";
import moment from "moment";

const readableDate = (date: Date): string => {
  let year = moment(date).format("YYYY");
  let month = moment(date).format("MM");
  let day = moment(date).format("DD");

  return year + "-" + month + "-" + day;
};

export default readableDate;

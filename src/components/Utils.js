import axios from "axios";
import { timeParse } from "d3-time-format";
// import React, { Component } from "react";
// import { tsvParse, csvParse } from "d3-dsv";

const parseDate = timeParse("%Y-%m-%d");

export async function getData() {
  let endpoint = `https://api.iextrading.com/1.0/stock/aapl/chart/1y`;
  const data = await axios.get(endpoint).then(res => {
    return res.data.map(item => {
      item.date = parseDate(item.date);
      return item;
    });
  });

  return data;
}

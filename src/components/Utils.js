import axios from "axios";
// import React, { Component } from "react";
// import { tsvParse, csvParse } from "d3-dsv";
// import { timeParse } from "d3-time-format";

export async function getData() {
  let endpoint = `https://api.iextrading.com/1.0/stock/aapl/chart/1y`;
  return await axios.get(endpoint).then(res => {
    const d = JSON.stringify(res.data);
    console.log(d);
    return d;
  });
}

// function parseData(parse) {
//   return function(d) {
//     d.date = parse(d.date);
//     d.open = +d.open;
//     d.high = +d.high;
//     d.low = +d.low;
//     d.close = +d.close;
//     d.volume = +d.volume;
// 		console.log(d);
//     return d;
//   };
// }

// const parseDate = timeParse("%Y-%m-%d");

// export function getData() {
//   const promiseMSFT = fetch(
//     "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
//   )
//     .then(response => response.text())
//     .then(data => tsvParse(data, parseData(parseDate)))

//   return promiseMSFT;
// }

import axios from "axios";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");

export async function getData(ticker, time) {
  const endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/chart/${time}`;
  return await axios.get(endpoint).then(res => {
    return res.data.map(item => {
      item.date = parseDate(item.date);
      return item;
    });
  });
}

export async function getQuote(ticker) {
  const endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/quote?displayPercent=true`;
  return await axios.get(endpoint).then(res => {
    return res.data;
  });
}

export async function getCompanyName(ticker) {
  const endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/company`;
  return await axios.get(endpoint).then(res => {
    return res.data.companyName;
  });
}

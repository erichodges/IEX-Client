import axios from "axios";
import { timeParse } from "d3-time-format";

export const parseDate = timeParse("%Y-%m-%d");
const API_Token = process.env.REACT_APP_IEX_API;
//
// https://api.iextrading.com/1.0/stock/${ticker}/chart/${time}
export async function getData(ticker, time) {
  const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${API_Token}`;
  return await axios.get(endpoint).then(res => {
    return res.data.map(item => {
      item.date = parseDate(item.date);
      return item;
    });
  });
}
// Thu Oct 25 2018 00:00:00
// "ddd MMM D  YYYY hh:mm:ss"
// &displayPercent=true
export async function getQuote(ticker) {
  const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${API_Token}`;
  return await axios.get(endpoint).then(res => {
    // console.log(res.data);
    return res.data;
  });
}

export async function getCompanyName(ticker) {
  const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${API_Token}`;
  return await axios.get(endpoint).then(res => {
    return res.data.companyName;
  });
}

export async function getKeyStats(ticker) {
  const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/stats?token=${API_Token}`;
  return await axios.get(endpoint).then(res => {
    return res.data;
  });
}

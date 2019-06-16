import axios from "axios";
import { timeParse } from "d3-time-format";

export const parseDate = timeParse("%Y-%m-%d");

//
// https://api.iextrading.com/1.0/stock/${ticker}/chart/${time}
export async function getData(ticker, time) {
  const endpoint = `https://cloud.iexapis.com/v1/stock/${ticker}/chart/${time}?token=process.env.REACT_APP_IEX_API`;
  return await axios.get(endpoint).then(res => {
    return res.data.map(item => {
      item.date = parseDate(item.date);
      return item;
    });
  });
}
// Thu Oct 25 2018 00:00:00
// "ddd MMM D  YYYY hh:mm:ss"
export async function getQuote(ticker) {
  const endpoint = `https://cloud.iexapis.com/v1/stock/${ticker}/quote?displayPercent=true?token=process.env.REACT_APP_IEX_API`;
  return await axios.get(endpoint).then(res => {
    // console.log(res.data);
    return res.data;
  });
}

export async function getCompanyName(ticker) {
  const endpoint = `https://cloud.iexapis.com/1.0/stock/${ticker}/company?token=process.env.REACT_APP_IEX_API`;
  return await axios.get(endpoint).then(res => {
    return res.data.companyName;
  });
}

export async function getKeyStats(ticker) {
  const endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/stats`;
  return await axios.get(endpoint).then(res => {
    return res.data;
  });
}

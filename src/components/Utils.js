import axios from "axios";
import { timeParse } from "d3-time-format";

export const parseDate = timeParse("%Y-%m-%d");
const API_Token = process.env.REACT_APP_IEX_API;
//
// https://api.iextrading.com/1.0/stock/${ticker}/chart/${time}
//

export async function getData(ticker, time) {
    const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${API_Token}`;
    try {
        const res = await axios.get(endpoint)
        return res.data.map(item => {
            item.date = parseDate(item.date);
            // console.log("Date", res.data[0])
            return item;
        });
    } catch(e) {
        console.log("Utils: getData" + e.message);
          return []
    }
}
 
// export async function getData(ticker, time) {
//     const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${API_Token}`;
//     return await axios.get(endpoint).then(res => {
//       return res.data.map(item => {
//         item.date = parseDate(item.date);
//         return item;
//       });
//     }).catch(e => console.log("Utils: getData" + e.message)); 
// }

// Thu Oct 25 2018 00:00:00
// "ddd MMM D  YYYY hh:mm:ss"
// &displayPercent=true
export async function getQuote(ticker) {
    const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${API_Token}`;
    return await axios.get(endpoint).then(res => {
      console.log("getQuote:", res.data);
      return res.data;
    }).catch(e => console.log("Utils: getQuote" + e.message)); 
}

export async function getCompanyName(ticker) {
  const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${API_Token}`;
  return await axios.get(endpoint).then(res => {
    console.log("getCompanyName:", res.data);
    return res.data.companyName;
  }).catch(e => console.log("Utils: getCompanyName" + e.message)); 
}

export async function getKeyStats(ticker) {
  const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/stats?token=${API_Token}`;
  return await axios.get(endpoint).then(res => {
    console.log("keyStats", res.data);
    return res.data;
  }).catch(e => console.log("Utils: getKeyStats" + e.message)); 
}



// export async function getData(ticker, time) {
//     const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${API_Token}`;
//     try {
//         const res = await axios.get(endpoint)
//         return res.data.map(item => {
//             item.date = parseDate(item.date);
//             return item;
//         });
//     } catch(e) {
//         console.log("Utils: getData" + e.message);
//         return []
//     } 
// }


// export async function getData(ticker, time) {
//     const endpoint = `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${API_Token}`;
//     return axios.get(endpoint).then(res => {
//       return res.data.map(item => {
//         item.date = parseDate(item.date);
//         return item;
//       });
//     }).catch(e => {
//         console.log("Utils: getData" + e.message);
//         return [];
//     }); 
// }
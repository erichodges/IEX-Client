import React, { Component } from "react";
// import ChartComponent from "./ChartComponent";
import Chart from "./Chart";
import ChartTicker from "./ChartTicker";
import { getData, getCompanyName, getQuote } from "./Utils";
import socket from "socket.io-client";

import { timeParse } from "d3-time-format";
const parseDate = timeParse("%Q");
class ChartLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companyName: "",
      date: "",
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0
    };
    const url = "https://ws-api.iextrading.com/1.0/tops";
    this.socket = socket(url, { forceNew: true });
    this.handleChartSubmit = this.handleChartSubmit.bind(this);

    this.socket.on("connect", () => {});

    this.socket.on("message", message => {
      const msg = JSON.parse(message);
      console.log(msg.lastSaleTime);
      const insertDate = parseDate(msg.lastSaleTime);
      // console.log("from socket.on", msg);
      let newData = {
        date: insertDate,
        open: this.state.open,
        high: this.state.high,
        low: this.state.low,
        close: msg.lastSalePrice,
        volume: this.state.volume
      };
      console.log(newData);
      this.setState(state => {
        return {
          data: [...state.data, newData]
        };
      });
    });
  }
  componentDidMount() {
    getData("SPY", "1y").then(data => {
      this.setState({ data });
    });
  }
  handleChartSubmit(e, ticker, time) {
    e.preventDefault();
    if (time === "") {
      time = "1y";
    }
    Promise.all([
      getData(ticker, time),
      getCompanyName(ticker),
      getQuote(ticker)
    ]).then(values => {
      this.setState({
        data: values[0],
        companyName: values[1],
        open: values[2].open,
        high: values[2].high,
        low: values[2].low,
        volume: values[2].latestVolume
      });
      this.socket.emit("subscribe", ticker);
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <ChartTicker
          onSubmit={this.handleChartSubmit}
          companyName={this.state.companyName}
        />
        {this.state.data.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <Chart data={this.state.data} />
        )}
      </div>
    );
  }
}

export default ChartLayout;

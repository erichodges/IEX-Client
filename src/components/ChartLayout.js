import React, { Component } from "react";
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
      oldTicker: "SPY",
      data: [],
      companyName: "",
      date: "",
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      change: 0
    };
    const url = "https://ws-api.iextrading.com/1.0/tops";
    this.socket = socket(url, { reconnection: true });
    this.handleChartSubmit = this.handleChartSubmit.bind(this);

    this.socket.on("connect", () => {
      this.socket.emit("subscribe", "SPY");
    });

    this.socket.on("message", message => {
      // const msg = JSON.parse(message);
      // console.log(msg.symbol);
      const insertDate = parseDate(this.state.date);

      let newData = {
        date: insertDate,
        open: this.state.open,
        high: this.state.high,
        low: this.state.low,
        close: this.state.close, // msg.lastSalePrice,
        volume: this.state.volume
      };
      // console.log(newData);
      this.setState(state => {
        return {
          data: [...state.data, newData]
        };
      });
      this.state.data.pop();
      // console.log(this.state.data); // shows newData in Data
    });
  }
  componentDidMount() {
    // getData("SPY", "1y").then(data => {
    //   this.setState({ data });
    // });
    //
    Promise.all([
      getData("SPY", "1y"),
      getCompanyName("SPY"),
      getQuote("SPY")
    ]).then(values => {
      this.socket.emit("unsubscribe", this.state.oldTicker);
      this.setState({
        data: values[0],
        companyName: values[1],
        date: values[2].latestUpdate,
        open: values[2].open,
        high: values[2].high,
        low: values[2].low,
        close: values[2].close, // iexRealtimePrice causes no data to load off hours
        volume: values[2].latestVolume,
        change: values[2].changePercent,
        oldTicker: "SPY"
      });
      // console.log(this.state.data.close);
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
      this.socket.emit("unsubscribe", this.state.oldTicker);
      this.setState({
        data: values[0],
        companyName: values[1],
        date: values[2].latestUpdate,
        open: values[2].open,
        high: values[2].high,
        low: values[2].low,
        close: values[2].close,
        volume: values[2].latestVolume,
        change: values[2].changePercent,
        oldTicker: ticker
      });
      this.socket.emit("subscribe", ticker);
      // console.log(this.state);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.symbol !== prevProps.symbol) {
      const time = "1y";
      const ticker = this.props.symbol;

      Promise.all([
        getData(ticker, time),
        getCompanyName(ticker),
        getQuote(ticker)
      ]).then(values => {
        this.socket.emit("unsubscribe", this.state.oldTicker);
        this.setState({
          data: values[0],
          companyName: values[1],
          date: values[2].latestUpdate,
          open: values[2].open,
          high: values[2].high,
          low: values[2].low,
          close: values[2].close,
          volume: values[2].latestVolume,
          change: values[2].changePercent,
          oldTicker: ticker
        });
        this.socket.emit("subscribe", ticker);
      });
    }
  }

  render() {
    console.log(process.env.REACT_APP_IEX_API);
    return (
      <div>
        <ChartTicker
          onSubmit={this.handleChartSubmit}
          companyName={this.state.companyName}
          close={this.state.close}
          ticker={this.state.oldTicker}
          change={this.state.change}
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

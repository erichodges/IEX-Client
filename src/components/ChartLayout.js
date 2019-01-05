import React, { Component } from "react";
// import ChartComponent from "./ChartComponent";
import Chart from "./Chart";
import ChartTicker from "./ChartTicker";
import { getData, getCompanyName } from "./Utils";

class ChartLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companyName: ""
    };
    this.handleChartSubmit = this.handleChartSubmit.bind(this);
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
    Promise.all([getData(ticker, time), getCompanyName(ticker)]).then(
      values => {
        this.setState({ data: values[0], companyName: values[1] });
      }
    );
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

import React, { Component } from "react";
// import ChartComponent from "./ChartComponent";
import Chart from "./Chart";
import ChartTicker from "./ChartTicker";
import { getData } from "./Utils";

class ChartLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleChartSubmit = this.handleChartSubmit.bind(this);
  }
  componentDidMount() {
    getData("SPY").then(data => {
      this.setState({ data });
    });
  }
  handleChartSubmit(e) {
    e.preventDefault();
    getData(e.target.value).then(data => {
      // should have logic to handle if ticker is not valid
      this.setState({ data });
      console.log(data);
    });
  }

  render() {
    return (
      <div onSubmit={this.handleChartSubmit}>
        <ChartTicker onSubmit={this.handleChartSubmit} />
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

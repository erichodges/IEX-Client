import React, { Component } from "react";
import ChartComponent from "./ChartComponent";
import ChartTicker from "./ChartTicker";

class ChartLayout extends Component {
  render() {
    return (
      <div>
        <ChartTicker />
        <ChartComponent />
      </div>
    );
  }
}

export default ChartLayout;

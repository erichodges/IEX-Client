import React, { Component } from "react";
import Quote from "./components/Quote";
import Chart from "./components/Chart";
import ChartComponent from "./components/index";

class App extends Component {
  render() {
    return (
      <div>
        <ChartComponent />
        <Chart />
        <Quote />
        <Quote />
      </div>
    );
  }
}

export default App;

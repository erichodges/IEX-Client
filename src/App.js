import React, { Component } from "react";
import ChartTicker from "./components/ChartTicker";
import ChartComponent from "./components/index";
import Quote from "./components/Quote";
class App extends Component {
  render() {
    return (
      <div>
        <div onChange={this.getData}>
          <ChartTicker />
        </div>

        <ChartComponent />
        <Quote />
        <Quote />
      </div>
    );
  }
}

export default App;

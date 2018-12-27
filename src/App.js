import React, { Component } from "react";
import ChartTicker from "./components/ChartTicker";
import Quote from "./components/Quote";
class App extends Component {
  render() {
    return (
      <div>
        <ChartTicker />
        <Quote />
        <Quote />
      </div>
    );
  }
}

export default App;

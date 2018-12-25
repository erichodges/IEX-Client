import React, { Component } from "react";
import Quote from "./components/Quote";
import ChartComponent from "./components/index";

class App extends Component {
  render() {
    return (
      <div>
        <ChartComponent />
        <Quote />
        <Quote />
      </div>
    );
  }
}

export default App;

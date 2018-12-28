import React, { Component } from "react";
import ChartLayout from "./components/ChartLayout";
import Quote from "./components/Quote";
class App extends Component {
  render() {
    return (
      <div>
        <ChartLayout />
        <Quote />
        <Quote />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
import Quote from "./components/Quote";

class App extends Component {
  render() {
    return (
      <div>
        <Quote />
        <Quote />
      </div>
    );
  }
}

export default App;

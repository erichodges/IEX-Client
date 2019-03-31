import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import Details from "./components/Details";
import Error from "./components/Error";
import Routes from "./Routes";
class App extends Component {
  render() {
    return <Routes />;
  }
}

export default App;

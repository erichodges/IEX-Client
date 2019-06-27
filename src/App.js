import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import CssBaseline from "@material-ui/core/CssBaseline";
import Details from "./components/Details";
import Error from "./components/Error";
import Routes from "./Routes";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes />;
    </>
  );
}

export default App;

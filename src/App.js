import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import Details from "./components/Details";
import Error from "./components/Error";
import Routes from "./Routes";

function App() {
  return (
    <>
      <Routes />;
    </>
  );
}

export default App;

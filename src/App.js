import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import Details from "./details";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/details" component={Details} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./components/Main";
import Details from "./components/Details";
import Error from "./components/Error";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuoteTicker: ""
    };
  }

  addTicker(item) {
    console.log(item.symbol);
    this.setState({
      currentQuoteTicker: item
      // tickerList: [...item]
    });
    // console.log(this.state.tickerList);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/details:symbol" component={Details} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

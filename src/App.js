import React, { Component } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tickers: [],
      data: []
    };
  }

  getQuote(ticker) {
    // this.setState({ loading: true });
    let query = this.newTicker.value;
    axios
      .get(`https://api.iextrading.com/1.0/stock/${query}/quote`)
      .then(res => {
        const data = res.data;
        this.setState({ data, loading: false });
        console.log(data);
      });
    this.addForm.reset();
  }

  addTicker(e) {
    e.preventDefault();
    // const { tickers } = this.state.tickers;
    const newTicker = this.newTicker.value;

    this.setState({
      tickers: [...this.state.tickers, newTicker]
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <form
            className="ticker-form"
            onSubmit={e => {
              this.addTicker(e);
              this.getQuote(this.newTicker);
            }}
            ref={input => (this.addForm = input)}
          >
            <div className="form-group">
              <label className="inputLabel" htmlFor="newTickerInput">
                Quote
              </label>
              &nbsp;
              <input
                ref={input => (this.newTicker = input)}
                type="text"
                placeholder="Add a Ticker"
                className="tickerInput"
              />
              &nbsp;
              <button type="submit" className="tickerSubmit">
                Add
              </button>
            </div>
          </form>

          <p>
            {this.state.data.symbol} {this.state.data.latestPrice}
          </p>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default App;

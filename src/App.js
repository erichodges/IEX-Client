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
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/quote`;
    axios.get(endpoint).then(res => {
      const data = res.data;
      console.log(data);
      data.latestPrice = data.latestPrice.toFixed(2);
      this.setState({ data: [...this.state.data, data] });
    });
    this.addForm.reset();
  }

  addTicker(e) {
    e.preventDefault();
    const newTicker = this.newTicker.value;

    this.setState({
      tickers: [...this.state.tickers, newTicker]
    });
  }

  render() {
    if (!this.state.loading) {
      // const { tickers } = this.state;
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
          <table>
            <thead />
            <tbody>
              {this.state.data.map(item => {
                return (
                  <tr key={item}>
                    <th scope="row" />
                    <td>
                      {item.symbol} {item.latestPrice}
                    </td>
                    <td>
                      <button>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default App;

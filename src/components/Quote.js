import React, { Component } from "react";
import axios from "axios";
import socket from "socket.io-client";

class Quote extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tickers: [],
      data: [],
      livePrice: [],
      getQuoteMessage: "",
      addTickerMessage: "",
      message: "",
      newTicker: ""
    };
    const url = "https://ws-api.iextrading.com/1.0/last";
    this.socket = socket(url);

    this.socket.on("connect", () => {
      // this.socket.emit("subscribe", "IBM");
      // this.socket.emit("subscribe", "AAPL");
      // this.socket.emit("subscribe", "SPY");
    });
    // Listen to the channel's messages
    // this.socket.on("message", message => console.log(message));
  }

  getStockData(e) {
    e.preventDefault();
    const ticker = this.newTicker.value.toUpperCase();
    let endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/quote`;
    axios.get(endpoint).then(res => {
      const data = res.data;
      data.latestPrice = data.latestPrice.toFixed(2);
      this.setState({
        data: [...this.state.data, data]
      });
      this.socket.emit("subscribe", ticker);
      this.socket.on("message", message => console.log(message));
    });
  }

  getQuote(ticker) {
    // this.setState({ loading: true });
    this.socket.emit("subscribe", ticker);

    let newQuote = this.state.data.length - 1;
    if (newQuote.symbol === this.newTicker.value) {
      this.setState({
        // data: [...this.state.data],
        getQuoteMessage: "get Quote Message"
      });
    } else {
      let query = ticker.toUpperCase();
      let endpoint = `https://api.iextrading.com/1.0/stock/${query}/quote`;
      axios.get(endpoint).then(res => {
        const data = res.data;
        data.latestPrice = data.latestPrice.toFixed(2);
        this.setState({
          data: [...this.state.data, data],
          getQuoteMessage: "",
          newTicker: query
        });
        // this.socket.emit("subscribe", query);
      });
      this.tickerForm.reset();
    }
  }

  addTicker(e) {
    e.preventDefault();
    const newTicker = this.newTicker.value.toUpperCase();
    if (this.state.tickers.includes(newTicker)) {
      this.setState({
        addTickerMessage: "This ticker symbol has already been added."
      });
    } else {
      this.setState({
        tickers: [...this.state.tickers, newTicker],
        message: ""
      });
    }
  }

  removeItem(item) {
    const newData = this.state.data.filter(data => {
      return data !== item;
    });

    this.setState({
      data: [...newData]
    });
  }

  removeTicker(item) {
    const newTickers = this.state.tickers.filter(tickers => {
      return tickers !== item;
    });
    this.setState({
      tickers: [...newTickers]
    });
    this.socket.emit("unsubscribe", item);
  }

  deleteAll(data) {
    this.setState({
      data: [],
      tickers: []
    });
  }

  render() {
    if (!this.state.loading) {
      const { data, addTickerMessage } = this.state;
      return (
        <div>
          <form
            className="ticker-form"
            onSubmit={e => {
              this.getStockData(e);
            }}
            ref={input => (this.tickerForm = input)}
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
          {addTickerMessage !== "" && (
            <p className="message-text">{addTickerMessage}</p>
          )}
          <table>
            <thead />
            <tbody>
              {data.map(item => {
                return (
                  <tr key={item.symbol}>
                    <th scope="row" />
                    <td>
                      {item.symbol} {item.latestPrice}
                    </td>
                    <td>
                      <button
                        onClick={e => {
                          this.removeItem(item);
                          this.removeTicker(item.symbol);
                        }}
                        type="button"
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <button
                    onClick={e => this.deleteAll(data)}
                    type="button"
                    className="delete-btn"
                  >
                    Remove All
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Quote;

// constructor() {
//   super();
//   this.state = {
//     loading: false,
//     tickers: [],
//     data: [],
//     message: ""
//   };
//   const url = "https://ws-api.iextrading.com/1.0/last";
//   this.socket = require("socket.io-client")(url);
// }

// and
// getQuote(ticker) {
//   // somestuff
//   this.socket.emit("subscribe", ticker);
// }

// and
// removeTicker(ticker) {
//   // somestuff
//   this.socket.emit("unsubscribe", ticker);
// }

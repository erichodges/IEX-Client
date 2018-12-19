import React, { Component } from "react";
import axios from "axios";
import socket from "socket.io-client";

class Quote extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      message: ""
    };
    const url = "https://ws-api.iextrading.com/1.0/last";
    this.socket = socket(url);

    this.socket.on("connect", () => {
      // this.socket.emit("subscribe", "IBM");
    });
    // Listen to the channel's messages
    this.socket.on("message", message => console.log(message));
  }

  getStockData(e) {
    e.preventDefault();
    const ticker = this.newTicker.value.toUpperCase();
    if (
      this.state.data.filter(item => {
        return item.symbol === ticker;
      }).length > 0
    ) {
      this.setState({
        message:
          "This ticker has already been entered, please choose another symbol"
      });
    } else {
      let endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/quote`;
      axios.get(endpoint).then(res => {
        const data = res.data;
        data.latestPrice = data.latestPrice.toFixed(2);
        data !== {} && // this does not work yet
          this.setState({
            data: [...this.state.data, data],
            message: ""
          });
        this.socket.emit("subscribe", ticker);
      });
    }

    this.tickerForm.reset();
  }

  removeItem(item) {
    const newData = this.state.data.filter(data => {
      return data !== item;
    });

    this.setState({
      data: [...newData],
      message: ""
    });
  }

  deleteAll(data) {
    this.setState({
      data: [],
      message: ""
    });
  }

  render() {
    console.log(this.state.data);
    if (!this.state.loading) {
      const { data, message } = this.state;
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
          {message !== "" && <p className="message-text">{message}</p>}
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

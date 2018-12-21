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
    this.socket.on("message", message => {
      const msg = JSON.parse(message);
      this.setState(state => {
        return {
          data: state.data.map(item => {
            if (item.symbol === msg.symbol) {
              item.latestPrice = msg.price.toFixed(2);
              return item;
            }
            return item;
          })
        };
      });
    });
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
      let endpoint = `https://api.iextrading.com/1.0/stock/${ticker}/quote?displayPercent=true`;
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
              Quote List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                  <td>
                    {item.symbol}&nbsp;&nbsp; {item.latestPrice}
                    &nbsp;&nbsp;&nbsp;
                    {item.change}
                    &nbsp;&nbsp;&nbsp;
                    {item.changePercent.toFixed(2)}% &nbsp;&nbsp;&nbsp;
                    {item.companyName}
                  </td>
                  <td>
                    <button
                      onClick={e => {
                        this.removeItem(item);
                      }}
                      type="button"
                      className="remove-btn"
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td />
            </tr>
          </tbody>
        </table>
        <div>
          <button
            onClick={e => this.deleteAll(data)}
            type="button"
            className="delete-btn"
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}

export default Quote;

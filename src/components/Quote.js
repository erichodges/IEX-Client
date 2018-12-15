import React, { Component } from "react";
import axios from "axios";

class Quote extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tickers: [],
      data: [],
      message: ""
    };
  }

  getQuote(ticker) {
    // this.setState({ loading: true });
    if (this.state.tickers.includes(this.newTicker.value)) {
      this.setState({
        message: "This Ticker has already been added."
      });
    } else {
      let query = this.newTicker.value;
      let endpoint = `https://api.iextrading.com/1.0/stock/${query}/quote`;
      axios.get(endpoint).then(res => {
        const data = res.data;
        data.latestPrice = data.latestPrice.toFixed(2);
        this.setState({ data: [...this.state.data, data], message: "" });
      });
      this.addForm.reset();
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

  deleteAll(data) {
    this.setState({
      data: [],
      tickers: []
    });
  }

  addTicker(e) {
    e.preventDefault();
    // const { tickers } = this.state;
    const newTicker = this.newTicker.value;
    // const isOnTheList = this.state.tickers.includes(newTicker);

    if (this.state.tickers.includes(newTicker)) {
      this.setState({
        message: "This Ticker has already been added."
      });
    } else {
      this.setState({
        tickers: [...this.state.tickers, newTicker],
        message: ""
      });
    }
  }

  render() {
    if (!this.state.loading) {
      const { data, message } = this.state;
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
          {message !== "" && <p className="message-text">{message}</p>}
          <table>
            <thead />
            <tbody>
              {data.map(item => {
                return (
                  <tr key={item}>
                    <th scope="row" />
                    <td>
                      {item.symbol} {item.latestPrice}
                    </td>
                    <td>
                      <button
                        onClick={e => this.removeItem(item)}
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

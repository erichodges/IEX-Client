import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
import socket from "socket.io-client";
import { getQuote, getKeyStats } from "./Utils";
// import SimpleModalWrapped from "./Modal";
import Modal from "@material-ui/core/Modal";
// import Typography from "@material-ui/core/Typography";

const url = "https://ws-api.iextrading.com/1.0/last";
class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      message: "",
      tickerList: [],
      open: false,
      keyStats: {}
    };

    this.onTickerForChart = this.onTickerForChart.bind(this);
  }

  componentDidMount() {
    this.socket = socket(url, {
      forceNew: true
    }); // forceNew does not seem to make a difference.

    this.socket.on("connect", () => {
      // console.log(socket.connected);
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
  componentWillUnmount() {
    this.socket.off();
    this.socket = null;
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  getStats(symbol) {
    getKeyStats(symbol).then(data => {
      this.setState({
        keyStats: data
      });
      // console.log(this.state.keyStats);
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
    console.log(this.state.keyStats);
  };

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
      getQuote(ticker).then(data => {
        data.latestPrice = data.latestPrice.toFixed(2);
        data !== {} && // In case of no data returned. this does not work yet.
          this.setState({
            data: [...this.state.data, data],
            message: ""
          });
        this.socket.emit("subscribe", ticker);
      });
    }
    this.tickerForm.reset();
  }

  addTicker(item) {
    this.setState({
      tickerList: [...item]
    });
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

  onTickerForChart({ currentTarget }) {
    this.props.setTickerForChart(currentTarget.value);
  }

  handleExtraZeros(item) {
    const trim = item / 1000000000;
    return trim.toFixed(2);
  }

  render() {
    // console.log(this.state.data);
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
              &nbsp;&nbsp;&nbsp; Quote List &nbsp; &nbsp;
            </label>
            &nbsp;
            <input
              ref={input => (this.newTicker = input)}
              type="text"
              placeholder="Enter Symbol"
              className="tickerInput"
            />
            &nbsp;
            <button type="submit" className="tickerSubmit">
              Add
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => this.props.remove(this.props.item)}>
              Close
            </button>
          </div>
        </form>
        {message !== "" && <p className="message-text"> {message}</p>}
        <table>
          <thead />
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.symbol}>
                  <td>
                    {item.symbol} &nbsp; &nbsp;
                    {item.latestPrice} &nbsp; &nbsp; &nbsp;
                    {item.change} &nbsp; &nbsp; &nbsp;
                    {item.changePercent.toFixed(2)} % &nbsp; &nbsp; &nbsp;
                    {item.companyName}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleOpen();
                        this.getStats(item.symbol);
                      }}
                      type="button"
                      className="toDetails-btn"
                    >
                      Details
                    </button>
                    <Modal
                      arialabelledby="simple-modal-title"
                      ariadescribedby="simple-modal-description"
                      open={this.state.open}
                      onClose={this.handleClose}
                    >
                      <div>
                        <h3>
                          {this.handleExtraZeros(this.state.keyStats.marketcap)}{" "}
                          B
                        </h3>
                        <p>{this.state.keyStats.latestEPS}</p>
                      </div>
                    </Modal>
                  </td>
                  <td>
                    <button
                      onClick={this.onTickerForChart}
                      value={item.symbol}
                      type="button"
                      className="chart-btn"
                    >
                      Chart
                    </button>
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
          &nbsp;&nbsp;&nbsp;
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

import React, { Component } from "react";
import socket from "socket.io-client";
import { getQuote, getKeyStats } from "./Utils";
import Modal from "@material-ui/core/Modal";
import StoreQuoteListName from "../modules/user/StoreQuoteListName";
import LoadQuoteList from "../modules/user/LoadQuoteList";

const url = "https://ws-api.iextrading.com/1.0/last";
class QuoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      message: "",
      open: false,
      keyStats: {},
      quoteListName: "Quote List"
    };

    this.onTickerForChart = this.onTickerForChart.bind(this);
    this.onSetQuoteListName = this.onSetQuoteListName.bind(this);
    this.onAddQuoteListName = this.onAddQuoteListName.bind(this);
  }

  componentDidMount() {
    this.socket = socket(url, {
      forceNew: true
    }); // forceNew does not seem to make a difference.

    this.socket.on("connect", () => {
      // console.log(socket.connected);
      // this.socket.emit("subscribe", "IBM");
    });
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
        // data !== {} && // In case of no data returned. this does not work yet.
        this.setState({
          data: [...this.state.data, data],
          message: ""
        });
        this.props.tickerToList(ticker, this.props.item.id);
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

  onAddQuoteListName(e) {
    this.props.addQuoteListName(
      this.quoteListName.current.value,
      this.props.item.id
    );
    this.setState({
      quoteListName: this.quoteListName.current.value
    });
    this.quoteListName.current.value = "";
  }

  onTickerForChart({ currentTarget }) {
    this.props.setTickerForChart(currentTarget.value);
  }

  handleExtraZeros(item) {
    const trim = item / 1000000000;
    return trim.toFixed(2);
  }

  onSetQuoteListName(quoteListName) {
    this.setState({
      quoteListName: quoteListName
    });
  }

  loadQuoteList = (quoteList, name) => {
    this.setState({ data: [] });
    quoteList.forEach(ticker => {
      getQuote(ticker).then(data => {
        this.setState({
          data: [...this.state.data, data],
          message: "",
          quoteListName: name
        });
        this.props.tickerToList(ticker, this.props.item.id);
        this.socket.emit("subscribe", ticker);
      });
    });
  };

  // to search for the quoteList by user:
  // QuoteList.find({ userId: xxx, name: "tech" })

  render() {
    // console.log(this.state.tickerList);
    const { data, message, quoteListName } = this.state;

    return (
      <div>
        <StoreQuoteListName
          item={this.props.item}
          addQuoteListName={this.props.addQuoteListName}
          quoteListDisplayName={this.onSetQuoteListName}
          quoteListArray={this.props.quoteListArray}
        />
        <LoadQuoteList loadQuoteList={this.loadQuoteList} />
        <form
          className="ticker-form"
          onSubmit={e => {
            this.getStockData(e);
          }}
          ref={input => (this.tickerForm = input)}
        >
          <div className="form-group">
            <label className="inputLabel" htmlFor="newTickerInput">
              &nbsp;&nbsp;&nbsp; {quoteListName} &nbsp; &nbsp;
            </label>
            &nbsp;
            <input
              ref={input => (this.newTicker = input)}
              type="text"
              placeholder="Enter Symbol"
              className="tickerInput"
              autoFocus
            />
            &nbsp;
            <button type="submit" className="tickerSubmit">
              Add
            </button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => this.props.remove(this.props.item)}>
              Close Quote List
            </button>
          </div>
        </form>
        &nbsp;&nbsp;
        {message !== "" && <p className="message-text"> {message}</p>}
        <table>
          <thead />
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.symbol}>
                  <td>
                    &nbsp;&nbsp;{item.symbol} &nbsp; &nbsp; &nbsp;&nbsp;
                    {item.latestPrice} &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    {item.change} &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    {item.changePercent.toFixed(2)} % &nbsp; &nbsp; &nbsp;
                    &nbsp;&nbsp;{item.companyName}
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

export default QuoteList;

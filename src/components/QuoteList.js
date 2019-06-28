import React, { Component } from "react";
import socket from "socket.io-client";

import { getQuote, getKeyStats } from "./Utils";
import SaveQuoteList from "../modules/user/SaveQuoteList";
import LoadQuoteList from "../modules/user/LoadQuoteList";
import UpdateQuoteList from "../modules/user/UpdateQuoteList";
import RemoveQuoteList from "../modules/user/RemoveQuoteList";
import QuoteListTable from "./QuoteListTable";

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

  getStats(symbol) {
    getKeyStats(symbol).then(data => {
      this.setState({
        keyStats: data
      });
      // console.log(this.state.keyStats);
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
      try {
        getQuote(ticker).then(data => {
          data.latestPrice = data.latestPrice.toFixed(2);
          this.setState({
            data: [...this.state.data, data],
            message: ""
          });
          this.props.tickerToList(ticker, this.props.item.id);
          this.socket.emit("subscribe", ticker);
        });
      } catch (error) {
        this.setState({
          message: "error.message"
        });
      }
    }
    this.tickerForm.reset();
  }

  removeItem = item => {
    const newData = this.state.data.filter(data => {
      return data !== item;
    });
    this.setState({
      data: [...newData],
      message: ""
    });
    this.props.removeTicker(item.symbol, this.props.item.id);
  };

  deleteAll = data => {
    this.setState({
      data: [],
      message: "",
      quoteListName: "Quote List"
    });
  };

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

  onTickerForChart = item => {
    this.props.setTickerForChart(item.symbol);
  };

  handleExtraZeros(marketcap) {
    const trimDigits = marketcap / 1000000000;
    return trimDigits.toFixed(2);
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
      console.log(quoteList, "from loadQuoteList in QuoteList");
    });
  };

  render() {
    console.log("from QuoteList", this.state.data);
    const { data, message, quoteListName } = this.state;

    return (
      <div>
        &nbsp;&nbsp;&nbsp; {quoteListName} &nbsp; &nbsp;
        <SaveQuoteList
          item={this.props.item}
          addQuoteListName={this.props.addQuoteListName}
          quoteListDisplayName={this.onSetQuoteListName}
          quoteListArray={this.props.quoteListArray}
          addQuoteListId={this.props.addQuoteListId}
        />
        <LoadQuoteList
          item={this.props.item}
          loadQuoteList={this.loadQuoteList}
          addQuoteListId={this.props.addQuoteListId}
        />
        <UpdateQuoteList
          item={this.props.item}
          quoteListArray={this.props.quoteListArray}
        />
        <RemoveQuoteList
          item={this.props.item}
          quoteListArray={this.props.quoteListArray}
          deleteTickers={() => this.deleteAll(data)}
        />
        <form
          className="ticker-form"
          onSubmit={e => {
            this.getStockData(e);
          }}
          ref={input => (this.tickerForm = input)}
        >
          <div className="form-group">
            <label className="inputLabel" htmlFor="newTickerInput" />
            &nbsp;&nbsp;&nbsp;&nbsp;
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
        &nbsp;&nbsp;&nbsp;
        <QuoteListTable
          data={data}
          removeItem={this.removeItem}
          onTickerForChart={this.onTickerForChart}
        />
      </div>
    );
  }
}

export default QuoteList;

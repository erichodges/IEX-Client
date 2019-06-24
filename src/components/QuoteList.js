import React, { Component } from "react";
import socket from "socket.io-client";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

import { getQuote, getKeyStats } from "./Utils";
import SaveQuoteList from "../modules/user/SaveQuoteList";
import LoadQuoteList from "../modules/user/LoadQuoteList";
import UpdateQuoteList from "../modules/user/UpdateQuoteList";
import RemoveQuoteList from "../modules/user/RemoveQuoteList";
import ModalKeyStats from "./ModalKeyStats";
import QuoteListTable from "./QuoteListTable";

const Delete = styled(DeleteIcon)({
  fill: "blue !important",
  background: "#fff !important",
  cursor: "pointer",
  padding: "none !important"
});
const CustomTable = styled(Table)({
  root: {
    width: 400,
    color: "blue"
  },
  paper: {
    marginTop: 0,
    width: 400,
    overflowX: "auto",
    marginBottom: 0
  },
  table: {
    width: 400,
    background: "#000"
  },
  icon: {
    fill: "blue !important",
    margin: 0,
    fontSize: 24,
    color: "green",
    borderColor: "#000"
  }
});

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
    this.props.removeTicker(item.symbol, this.props.item.id);
  }

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

  onTickerForChart({ currentTarget }) {
    this.props.setTickerForChart(currentTarget.value);
  }

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
        <QuoteListTable data={data} />
        &nbsp;&nbsp;&nbsp;
        <Container maxWidth="md">
          <div className={CustomTable.root}>
            <Paper className={CustomTable.paper}>
              <CustomTable className={CustomTable.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Ticker</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Change</TableCell>
                    <TableCell align="right">% Change</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Detials</TableCell>
                    <TableCell align="right">Chart</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(item => {
                    return (
                      <TableRow key={item.symbol}>
                        <TableCell align="left">{item.symbol}</TableCell>
                        <TableCell align="right">{item.latestPrice}</TableCell>
                        <TableCell align="right">{item.change}</TableCell>
                        <TableCell align="right">
                          {item.changePercent.toFixed(2)} %{" "}
                        </TableCell>
                        <TableCell align="right">{item.companyName}</TableCell>
                        <TableCell align="right">
                          <ModalKeyStats
                            symbol={item.symbol}
                            keyStats={this.state.keyStats}
                            marketcap={this.state.keyStats.marketcap}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            align="right"
                            onClick={this.onTickerForChart}
                            value={item.symbol}
                            type="button"
                            className="chart-btn"
                          >
                            Chart
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Delete
                            align="right"
                            onClick={e => {
                              this.removeItem(item);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <tr>
                    <td />
                  </tr>
                </TableBody>
              </CustomTable>
            </Paper>
          </div>
        </Container>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default QuoteList;

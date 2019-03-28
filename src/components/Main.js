import React from "react";
import ChartLayout from "./ChartLayout";
import Header from "./Header";
import QuoteList from "./QuoteList";
import shortid from "shortid";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerFromQuote: "",
      items: []
    };
    this.onSendQuoteTicker = this.onSendQuoteTicker.bind(this);
  }
  onSendQuoteTicker(ticker) {
    this.setState({
      tickerFromQuote: ticker
    });
  }

  onAddChild = () => {
    this.setState(prev => ({
      items: [...prev.items, { id: shortid.generate(), tickers: [] }]
    }));
  };

  onRemoveChild = item => {
    this.setState(prev => ({
      items: prev.items.filter(prevItem => prevItem.id !== item.id)
    }));
  };

  onAddTickerToItem = (ticker, id) => {
    this.setState(prev => ({
      items: prev.items.map(prevItem => {
        if (prevItem.id === id) {
          return { ...prevItem, tickers: [...prevItem.tickers, ticker] };
        }
        return prevItem;
      })
    }));
  };

  render() {
    console.log(this.state.items);
    return (
      <div>
        <Header />
        <ChartLayout symbol={this.state.tickerFromQuote} />
        <QuoteListContainer addChild={this.onAddChild}>
          {this.state.items.map(item => (
            <QuoteList
              key={item.id}
              item={item}
              remove={this.onRemoveChild}
              setTickerForChart={this.onSendQuoteTicker}
              tickerToList={this.onAddTickerToItem}
            />
          ))}
        </QuoteListContainer>
      </div>
    );
  }
}

const QuoteListContainer = props => (
  <div>
    &nbsp;&nbsp;<button onClick={props.addChild}>Add Live Quote List</button>
    &nbsp;&nbsp;<div id="children-pane">{props.children}</div>
  </div>
);

export default Main;

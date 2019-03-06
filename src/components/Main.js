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

  onAddTickerToItem = (ticker, item) => {
    this.setState(prev => ({
      items: prev.items.map(prevItem => {
        if (prevItem.id === item.id) {
          return { ...prevItem, tickers: [...prevItem.tickers, ticker] };
        }
        return item;
      })
    }));
  };

  render() {
    console.log(this.state.items);
    return (
      <div>
        <Header />
        <ChartLayout symbol={this.state.tickerFromQuote} />
        <ListContainer addChild={this.onAddChild}>
          {this.state.items.map(item => (
            <QuoteList
              key={item.id}
              item={item}
              remove={this.onRemoveChild}
              setTickerForChart={this.onSendQuoteTicker}
              tickerToList={this.onAddTickerToItem}
            />
          ))}
        </ListContainer>
      </div>
    );
  }
}

const ListContainer = props => (
  <div>
    <button onClick={props.addChild}>Add Live Quote List</button>
    <div id="children-pane">{props.children}</div>
  </div>
);

export default Main;

import React from "react";
import shortid from "shortid";
import ChartLayout from "./ChartLayout";
import Header from "./Header";
import QuoteList from "./QuoteList";

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
      items: [
        ...prev.items,
        {
          id: shortid.generate(),
          tickers: [],
          name: "",
          quoteListId: ""
        }
      ]
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
          return {
            ...prevItem,
            tickers: Array.from(new Set([...prevItem.tickers, ticker]))
          };
        }
        return prevItem;
      })
    }));
  };

  onRemoveTickerFromQuoteList = (ticker, id) => {
    this.setState(prev => ({
      items: prev.items.map(prevItem => {
        if (prevItem.id === id) {
          return {
            ...prevItem,
            tickers: prevItem.filter(prevItem => prevItem.tickers !== ticker)
          };
        }
        return prevItem;
      })
    }));
  };

  onAddQuoteListNameToItem = (quoteListName, id) => {
    this.setState(prev => ({
      items: prev.items.map(prevItem => {
        if (prevItem.id === id) {
          return {
            ...prevItem,
            name: quoteListName
          };
        }
        return prevItem;
      })
    }));
  };

  onAddQuoteListIdToItem = (savedQuoteListId, itemId, name) => {
    this.setState(prev => ({
      items: prev.items.map(prevItem => {
        if (prevItem.id === itemId) {
          return {
            ...prevItem,
            quoteListId: savedQuoteListId,
            name: name
          };
        }
        return prevItem;
      })
    }));
    console.log("from onAddQuoteListIdToItem:", savedQuoteListId, itemId, name);
  };

  render() {
    console.log(this.state.items, "from Main.js");
    const { items } = this.state;
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
              addQuoteListName={this.onAddQuoteListNameToItem}
              quoteListArray={items}
              addQuoteListId={this.onAddQuoteListIdToItem}
              removeTicker={this.onRemoveTickerFromQuoteList}
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
    <br />
    &nbsp;&nbsp;<div id="children-pane">{props.children}</div>
  </div>
);

export default Main;

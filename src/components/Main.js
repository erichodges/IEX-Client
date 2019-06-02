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
            tickers: [...prevItem.tickers, ticker]
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
            QuoteListName: quoteListName
          };
        }
        return prevItem;
      })
    }));
  };

  onAddQuoteListIdToItem = (savedQuoteListId, itemId) => {
    this.setState(prev => ({
      items: prev.items.map(prevItem => {
        if (prevItem.id === itemId) {
          return {
            ...prevItem,
            quoteListId: savedQuoteListId
          };
        }
        return prevItem;
      })
    }));
    console.log("from onAddQuoteListIdToItem", savedQuoteListId, itemId);
  };

  render() {
    // console.log(this.state.items);
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

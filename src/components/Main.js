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

  onAddTickerToItem(ticker) {
    // this.setState(prev => ({
    //   items: [...prev.items]
    // }));
    console.log(ticker);
  }

  onAddChild = () => {
    this.setState(prev => ({
      items: [...prev.items, { id: shortid.generate() }]
    }));
  };

  onRemoveChild = item => {
    this.setState(prev => ({
      items: prev.items.filter(prevItem => prevItem.id !== item.id)
    }));
  };

  render() {
    console.log(this.state.items);
    return (
      <div>
        <Header />
        <ChartLayout symbol={this.state.tickerFromQuote} />
        <ParentComponent addChild={this.onAddChild}>
          {this.state.items.map(item => (
            <QuoteList
              key={item.id}
              item={item}
              remove={this.onRemoveChild}
              setTickerForChart={this.onSendQuoteTicker}
              tickerToList={this.onAddTickerToItem}
            />
          ))}
        </ParentComponent>
      </div>
    );
  }
}

const ParentComponent = props => (
  <div>
    <button onClick={props.addChild}>Add Live Quote List</button>
    <div id="children-pane">{props.children}</div>
  </div>
);

export default Main;

import React from "react";
import ChartLayout from "./ChartLayout";
import Quote from "./Quote";
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
  
  onRemoveChild = item => {
    this.setState(prev => ({
      items: prev.items.filter(prevItem => prevItem.id !== item.id)
    }));
  };

  onAddChild = item => {
    this.setState(prev => ({
      items: [...prev.items, { id: shortid.generate()}]    
    }));
  }

  const ParentComponent = props => {
    <div>
      <button onClick={props.addChild}>Add Quote List</button>
      <div id="children-pane">{props.children}</div>
    </div>
  };

  render() {
    return (
      <div>
        <ChartLayout symbol={this.state.tickerFromQuote} />
        <ParentComponent addChild={this.onAddChild}>
          {this.state.items.map(item => {
            <Quote 
              key={item.id}
              item={item}
              remove={this.onRemoveChild}
              setTickerForChart={this.onSendQuoteTicker}
            />
          })}
        </ParentComponent>
        <Quote setTickerForChart={this.onSendQuoteTicker} />
      </div>
    );
  }
}
export default Main;

import React from "react";
import ChartLayout from "./ChartLayout";
import Quote from "./Quote";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerFromQuote: ""
    };

    this.onSendQuoteTicker = this.onSendQuoteTicker.bind(this);
  }
  onSendQuoteTicker(ticker) {
    this.setState({
      tickerFromQuote: ticker
    });
    console.log("onSendQuoteTicker triggered");
  }
  render() {
    console.log(this.state.tickerFromQuote);
    return (
      <div>
        <ChartLayout symbol={this.state.tickerFromQuote} />
        <Quote setTickerForChart={this.onSendQuoteTicker} />
      </div>
    );
  }
}
export default Main;

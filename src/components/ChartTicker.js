import React, { Component } from "react";
import ChartComponent from "./index";
class ChartTicker extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <div>
        <form className="chart-ticker-form">
          <div className="form-group">
            <label className="inputLabel" htmlFor="newTickerInput">
              Get A Chart &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            &nbsp;
            <input
              ref={input => (this.newTicker = input)}
              type="text"
              placeholder="Add a Ticker"
              className="tickerInput"
            />
            &nbsp;
            <button type="submit" className="chartTickerSubmit">
              Add
            </button>
          </div>
        </form>
        <ChartComponent />
      </div>
    );
  }
}

export default ChartTicker;

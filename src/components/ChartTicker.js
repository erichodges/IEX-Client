import React, { Component } from "react";
import PropTypes from "prop-types";
// import ChartComponent from "./ChartComponent";

class ChartTicker extends Component {
  constructor(props) {
    super();
    this.state = {
      chartTicker: "SPY"
    };
  }
  onHandleChange(event) {
    this.setState({
      chartTicker: event.target.value.toUpperCase()
    });
  }
  handleChartSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <form
        className="ChartTicker-form"
        onSubmit={e => {
          this.handleChartSubmit(e);
        }}
        // ref={input => (this.tickerForm = input)}
      >
        <div className="form-group">
          <label className="inputLabel" htmlFor="newTickerInput">
            Get A Chart &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          &nbsp;
          <input
            ref={input => (this.newTicker = input)}
            type="text"
            value={this.state.chartTicker}
            onChange={event => this.onHandleChange(event)}
            placeholder="Add a Ticker"
            className="chartTickerInput"
          />
          &nbsp;
          <button type="submit" className="chartTickerSubmit">
            Add
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <b>{this.state.chartTicker}</b>
        </div>
      </form>
    );
  }
}

ChartTicker.propTypes = {
  chartTicker: PropTypes.string
};

export default ChartTicker;

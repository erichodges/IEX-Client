import React, { Component } from "react";
import PropTypes from "prop-types";
// import ChartComponent from "./ChartComponent";

class ChartTicker extends Component {
  constructor() {
    super();
    this.state = {
      chartTicker: "",
      chartTimeFrame: ""
    };
  }
  onHandleChange(event) {
    this.setState({
      chartTicker: event.target.value.toUpperCase()
    });
  }
  onHandleChangeTimeFrame(event) {
    this.setState({
      chartTimeFrame: event.target.value.toLowerCase()
    });
  }
  render() {
    return (
      <form
        className="ChartTicker-form"
        onSubmit={e => {
          this.props.onSubmit(
            e,
            this.state.chartTicker,
            this.state.chartTimeFrame
          );
        }}
        ref={input => (this.chartTickerForm = input)}
      >
        <div className="form-group">
          <label className="inputLabel" htmlFor="newTickerInput">
            Get A Chart &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          &nbsp;
          <input
            ref={input => (this.chartTicker = input)}
            type="text"
            value={this.state.chartTicker}
            onChange={event => this.onHandleChange(event)}
            placeholder="Add a Ticker"
            className="chartTickerInput"
          />
          &nbsp;
          <select
            ref={input => (this.chartTimeFrame = input)}
            type="text"
            value={this.state.chartTimeFrame}
            onChange={event => this.onHandleChangeTimeFrame(event)}
            placeholder="1m, 3m, 6m, 1y"
            className="chartTimeFrameInput"
          >
            <option value="">Duration</option>
            <option value="1y">1 year</option>
            <option value="1m">1 month</option>
            <option value="3m">3 month</option>
            <option value="6m">6 month</option>

            <option value="ytd">YTD</option>
            <option value="2y">2 year</option>
          </select>
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

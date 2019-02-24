import React, { Component } from "react";
import PropTypes from "prop-types";
// import ChartComponent from "./ChartComponent";

class ChartTicker extends Component {
  constructor() {
    super();
    this.state = {
      chartTicker: "",
      displayTicker: "",
      chartTimeFrame: ""
    };
  }
  onHandleChange(event) {
    this.setState({
      chartTicker: event.target.value.toUpperCase(),
      displayTicker: event.target.value.toUpperCase()
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
          this.setState({ chartTicker: "" });
        }}
        ref={input => (this.chartTickerForm = input)}
      >
        <div className="form-group">
          <label className="inputLabel" htmlFor="newTickerInput">
            &nbsp;&nbsp;&nbsp;
          </label>
          &nbsp;
          <input
            ref={input => (this.chartTicker = input)}
            type="text"
            value={this.state.chartTicker}
            onChange={event => this.onHandleChange(event)}
            placeholder="Enter Symbol for Chart"
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
            <option value="ytd">YTD</option>
            <option value="1m">1 month</option>
            <option value="3m">3 month</option>
            <option value="6m">6 month</option>
            <option value="1y">1 year</option>
            <option value="2y">2 year</option>
            <option value="5y">5 year</option>
          </select>
          &nbsp;
          <button type="submit" className="chartTickerSubmit">
            Add
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <b>{this.props.ticker}</b>
          &nbsp;&nbsp;&nbsp; {this.props.companyName}
          &nbsp;&nbsp; <b>{this.props.close.toFixed(2)}</b>
          &nbsp;&nbsp;&nbsp; <b>{this.props.change}%</b>
        </div>
      </form>
    );
  }
}

ChartTicker.propTypes = {
  chartTicker: PropTypes.string
};

export default ChartTicker;

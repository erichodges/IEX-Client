import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import DarkTextField from "./styleComponents/DarkTextField";
import Button from "@material-ui/core/Button";
import styles from "./styles/ticker.module.css";

class ChartTicker extends Component {
  constructor() {
    super();
    this.state = {
      chartTicker: "",
      displayTicker: "",
      chartTimeFrame: ""
    };
  }
  onHandleChange = event => {
    this.setState({
      chartTicker: event.target.value.toUpperCase(),
      displayTicker: event.target.value.toUpperCase()
    });
  };
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
        <div
          className="chartForm"
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <label className="inputLabel" htmlFor="newTickerInput">
            &nbsp;&nbsp;&nbsp;
          </label>
          &nbsp;
          <DarkTextField
            inputRef={input => (this.input = input)}
            onChange={this.onHandleChange}
            value={this.state.chartTicker}
            variant="outlined"
            margin="dense"
            placeholder={"Enter Symbol"}
            className="chartTickerInput"
            type="text"
            size="small"
            autoFocus={true}
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
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            size="small"
            className="chartTickerSubmit"
          >
            Add
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Typography
            className={styles["MUILineBreak"]}
            variant="h6"
            inline="true"
          >
            {this.props.ticker}
          </Typography>
          <Typography className={styles["CompanyDetails"]}>
            &nbsp;&nbsp;&nbsp; {this.props.companyName}
            &nbsp;&nbsp; <b>{this.props.close.toFixed(2)}</b>
            &nbsp;&nbsp;&nbsp; <b>{this.props.change.toFixed(2)}%</b>
          </Typography>
        </div>
      </form>
    );
  }
}

ChartTicker.propTypes = {
  chartTicker: PropTypes.string
};

export default ChartTicker;

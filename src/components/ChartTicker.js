import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import DarkTextField from "./styleComponents/DarkTextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/ticker.module.css";

const myStyles = {
  formControl: {
    minWidth: 140
  },
  focused: {},
  disabled: {},
  error: {},
  underlineInput: {
    "&:before": {
      // normal
      borderBottom: "1px solid #90caf9"
    },
    // focused
    "&:after": {
      borderBottom: "2px solid #90caf9"
    },
    // hover
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid #90caf9"
    }
  }
};

class ChartTicker extends Component {
  constructor() {
    super();
    this.state = {
      chartTicker: "",
      displayTicker: "",
      chartTimeFrame: "",
      name: ""
    };
  }
  onHandleChange = event => {
    this.setState({
      chartTicker: event.target.value.toUpperCase(),
      displayTicker: event.target.value.toUpperCase()
    });
  };
  onHandleChangeTimeFrame = event => {
    this.setState({
      chartTimeFrame: event.target.value.toLowerCase(),
      name: event.target.name
    });
    console.log("onHandleChangeTimeFrame", event.target.name);
  };
  render() {
    const { classes } = this.props;

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
          <FormControl className={classes.formControl}>
            <Select
              value={this.chartTimeFrame}
              onChange={event => this.onHandleChangeTimeFrame(event)}
              displayEmpty={true}
              input={
                <Input
                  classes={{
                    focused: classes.focused,
                    disabled: classes.disabled,
                    error: classes.error,
                    underline: classes.underlineInput
                  }}
                />
              }
              renderValue={
                this.state.chartTimeFrame > 0
                  ? undefined
                  : () => <span>{this.state.name}</span>
              }
            >
              <MenuItem value="" name="Duration" disabled>
                Duration
              </MenuItem>
              <MenuItem value="ytd" name="YTD">
                YTD
              </MenuItem>
              <MenuItem value="1m" name="One Month">
                One Month
              </MenuItem>
              <MenuItem value="3m" name="Three Month">
                Three Month
              </MenuItem>
              <MenuItem value="6m" name="Six Month">
                Six Month
              </MenuItem>
              <MenuItem value="1y" name="One Year">
                One Year
              </MenuItem>
            </Select>
          </FormControl>
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

const StyledChartTicker = withStyles(myStyles)(ChartTicker);

export default StyledChartTicker;

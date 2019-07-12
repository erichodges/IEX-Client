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
    minWidth: 140,
    marginRight: "1rem",
    marginLeft: "1rem"
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
              value={this.state.chartTimeFrame}
              name={this.state.name}
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
              renderValue={() => {
                switch (this.state.chartTimeFrame) {
                  case "Duration":
                    return "Duration";
                  case "ytd":
                    return "Year to Date";
                  case "1m":
                    return "One Month";
                  case "3m":
                    return "Three Month";
                  case "6m":
                    return "Six Month";
                  case "1y":
                    return "One Year";
                  default:
                    return "Duration";
                }
              }}
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
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            size="small"
            className="chartTickerSubmit"
          >
            Chart
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

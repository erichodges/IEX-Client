import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { timeParse } from "d3-time-format";
// import React, { Component } from "react";
// import { tsvParse, csvParse } from "d3-dsv";

class Utils extends React.Component {
  render() {
    return <p>{this.props.text}</p>;
  }
}
Utils.propTypes = {
  text: PropTypes.string
};
Utils.defaultProps = {
  text: null
};

const parseDate = timeParse("%Y-%m-%d");

export async function getData() {
  // e.preventDefault();
  const endpoint = "https://api.iextrading.com/1.0/stock/spy/chart/3m";
  return await axios.get(endpoint).then(res => {
    return res.data.map(item => {
      item.date = parseDate(item.date);
      return item;
    });
  });
}

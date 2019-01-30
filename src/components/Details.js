import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    console.log(`symbol: ${params.symbol}`);
  }

  render() {
    return (
      <div>
        <h3>Details Page</h3>
        <NavLink to="/">Main Page</NavLink>
      </div>
    );
  }
}

export default Details;

import React, { Component } from "react";
import { Link } from "react-router-dom";

const ulStyle = {
  listStyle: "none",
  display: "flex",
  alignItems: "center"
};

const logoStyle = {
  marginRight: "auto"
};

const userItemsStyle = {
  marginRight: "2rem"
};
class Header extends Component {
  render() {
    return (
      <div>
        <ul style={ulStyle}>
          <li style={logoStyle}>
            <h3>IEX Data App</h3>
          </li>
          <li>
            <Link to="/login" style={userItemsStyle}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" style={userItemsStyle}>
              Register
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;

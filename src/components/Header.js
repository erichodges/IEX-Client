import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
// import { Link } from "react-router-dom";

const ulStyle = {
  listStyle: "none",
  display: "flex",
  alignItems: "center",
  paddingLeft: "0",
  marginLeft: "1rem"
};

const logoStyle = {
  marginRight: "auto"
};

class Header extends Component {
  render() {
    return (
      <div>
        <ul style={ulStyle}>
          <li style={logoStyle}>
            <h3>IEX Data App</h3>
          </li>
          <LoginHeader />
        </ul>
      </div>
    );
  }
}

export default Header;

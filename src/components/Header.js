import React, { Component } from "react";
import LoginHeader from "./LoginHeader";

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
            <h3>Quick Chart</h3>
          </li>
          <LoginHeader />
        </ul>
      </div>
    );
  }
}

export default Header;

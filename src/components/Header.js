import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginHeader from "../modules/user/LoginHeader";


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

const linkStyle = {
  color: "#f5f5f5",
  textDecoration: "none"
};

class Header extends Component {
  render() {
    return (
      <div>
        <ul style={ulStyle}>
          <li style={logoStyle}>
            <Link to="/" style={linkStyle}>
            <Typography variant="h6">Quick Chart</Typography>
            </Link>
          </li>
          <LoginHeader />
        </ul>
      </div>
    );
  }
}

export default Header;

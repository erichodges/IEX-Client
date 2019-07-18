import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
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

class Header extends Component {
  render() {
    return (
      <div>
        <ul style={ulStyle}>
          <li style={logoStyle}>
            <Typography variant="h6">Quick Chart</Typography>
          </li>
          <LoginHeader />
        </ul>
      </div>
    );
  }
}

export default Header;

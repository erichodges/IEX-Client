import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { gql } from "apollo-boost";
import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      userName
      email
      id
    }
  }
`;

const userItemsStyle = {
  marginRight: "2rem",
  display: "flex",
  alignItems: "center"
};

const logoutButton = {
  marginLeft: "1rem"
};
const loginButton = {
  marginRight: "1rem"
};

class LoginHeader extends Component {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }
          if (data) {
            if (data.me) {
              return (
                <div style={userItemsStyle}>
                  <Typography variant="h6">{data.me!.userName}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component={Link}
                    to="/logout"
                    style={logoutButton}
                  >
                    Logout
                  </Button>
                </div>
              );
            } else {
              return (
                <div>
                  <li>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      component={Link}
                      to="/login"
                      style={loginButton}
                    >
                      Login
                    </Button>
                  </li>
                </div>
              );
            }
          }
          return (
            <div>
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
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LoginHeader;

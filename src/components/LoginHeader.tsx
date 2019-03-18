import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { MeQuery } from "../schemaTypes";
import { Link } from "react-router-dom";

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
  marginRight: "2rem"
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
              return <div style={userItemsStyle}>{data.me!.userName}</div>;
            } else {
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

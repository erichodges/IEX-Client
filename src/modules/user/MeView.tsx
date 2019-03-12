import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { MeQuery } from "../../schemaTypes";
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
class MeView extends PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }
          if (!data) {
            return <div>data is undefined</div>;
          }
          if (!data.me) {
            return <div>No User Received</div>;
          }
          return (
            <div>
              &nbsp;&nbsp;&nbsp; Welcome {data.me.userName}
              <br />
              <br />
              <div>
                &nbsp;&nbsp;&nbsp;
                <Link to="/">Main Page</Link>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MeView;

import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      id
      email
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
          return <div>&nbsp;&nbsp;&nbsp;Welcome {data.me.email}</div>;
        }}
      </Query>
    );
  }
}

export default MeView;

import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import { Mutation } from "react-apollo";
// @ts-ignore
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      userName
      email
      id
      quoteList {
        tickers
        name
      }
    }
  }
`;

class LoadQuoteList extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // @ts-ignore
  }
  // @ts-ignore

  // @ts-ignore

  render() {
    return (
      // @ts-ignore
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (data!.me! === null) {
            return null;
          }
          if (data!.me!.quoteList) {
            return (
              <div>
                &nbsp;&nbsp;&nbsp;
                {console.log(data!.me!.quoteList)}
                <select>
                  // @ts-ignore
                  {data!.me!.quoteList.map(item => {
                    // @ts-ignore
                    return <option key={item.name}>{item.name}</option>;
                  })}
                </select>
                &nbsp;
              </div>
            );
          }
          return <div />;
        }}
      </Query>
    );
  }
}
export default LoadQuoteList;

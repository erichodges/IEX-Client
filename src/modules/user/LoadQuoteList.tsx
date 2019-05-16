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

interface State {
  value: string;
  loading: boolean;
}

class LoadQuoteList extends Component<any, State> {
  // @ts-ignore
  state = {
    value: "Select a Quote List",
    loading: true
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
  };

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
                <form onSubmit={this.handleSubmit}>
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option>Select a Quote List</option>
                    // @ts-ignore
                    {data!.me!.quoteList.map(item => {
                      // @ts-ignore
                      return <option key={item.name}>{item.name}</option>;
                    })}
                  </select>
                  &nbsp;
                  <button type="submit" value="submit">
                    Load Quote List{" "}
                  </button>
                </form>
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

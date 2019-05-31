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
        id
        tickers
        name
      }
    }
  }
`;

interface State {
  value: string;
  loading: boolean;
  quoteLists: [string];
}

class LoadQuoteList extends Component<any, State> {
  // @ts-ignore
  state = {
    value: "Select a Quote List",
    loading: true,
    selectedTickerList: [],
    quoteLists: [],
    selectedQuoteList: {}
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>, quoteList: any) => {
    e.preventDefault();
    this.setState({ quoteLists: quoteList });

    const { quoteLists } = this.state;

    quoteLists.map(quoteList => {
      // @ts-ignore
      if (quoteList.name === this.state.value) {
        // @ts-ignore
        this.props.loadQuoteList(quoteList.tickers, quoteList.name);
        // @ts-ignore
        this.setState({ selectedQuoteList: quoteList });
      }
    });
  };
  // @ts-ignore
  addQuoteListId = quoteListArray => {
    const quoteListId = this.props.item.id;
    // @ts-ignore
    const selectedQuoteList = this.state.selectedQuoteList;
    // @ts-ignore
    quoteListArray.map(item => {
      // @ts-ignore
      if (quoteListId === selectedQuoteList.id) {
        // @ts-ignore
        this.props.addQuoteListId(selectedQuoteList.id, quoteListId);
      }
    });
  };
  //
  render() {
    const quoteListArray = this.props.quoteListArray;
    console.log(this.state.selectedQuoteList);
    return (
      // @ts-ignore
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (!data! || !data!.me!) {
            return null;
          }
          if (data!.me!.quoteList) {
            return (
              <div>
                <form
                  onSubmit={e => {
                    this.handleSubmit(e, data!.me!.quoteList);
                    this.addQuoteListId(quoteListArray);
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
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

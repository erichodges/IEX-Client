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
      const itemId = this.props.item.id;
      // @ts-ignore
      const selectedQuoteListId = this.state.selectedQuoteList.id;
      // @ts-ignore
      if (quoteList.name === this.state.value) {
        // @ts-ignore
        this.props.loadQuoteList(quoteList.tickers, quoteList.name);
        // @ts-ignore
        this.setState({ selectedQuoteList: quoteList });
        // @ts-ignore
        this.props.addQuoteListId(quoteList.id, itemId, quoteList.name);
        // @ts-ignore
        console.log(this.state.selectedQuoteList, itemId, "from handleSubmit");
      }
    });
  };
  // @ts-ignore
  addQuoteListId = quoteListArray => {
    const itemId = this.props.item.id;
    // @ts-ignore
    const selectedQuoteListId = this.state.selectedQuoteList.id;
    // @ts-ignore
    quoteListArray.map(item => {
      // @ts-ignore
      if (item.id === itemId) {
        // @ts-ignore
        this.props.addQuoteListId(selectedQuoteListId, item.id);
        console.log(selectedQuoteListId, "from addQuoteListId");
      }
    });
    // @ts-ignore
    console.log(selectedQuoteListId);
  };
  //
  render() {
    const quoteListArray = this.props.quoteListArray;
    // @ts-ignore
    console.log(this.state.selectedQuoteList.id);
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

import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import {
  MeQuery,
  addQuoteList_addQuoteList,
  addQuoteListVariables
} from "../../schemaTypes";

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

const ADD_QUOTE_LIST = gql`
  mutation addQuoteList($tickers: [String]!, $name: String!) {
    addQuoteList(tickers: $tickers, name: $name) {
      tickers
      name
    }
  }
`;

class StoreQuoteListName extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // @ts-ignore
    this.quoteListName = React.createRef();

    this.state = {
      quoteListName: "Quote List"
    };
    // @ts-ignore
    this.onAddQuoteListName = this.onAddQuoteListName.bind(this);
    // @ts-ignore
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }
  // @ts-ignore
  onAddQuoteListName(e) {
    // @ts-ignore
    this.props.addQuoteListName(
      // @ts-ignore
      this.quoteListName.current.value,
      // @ts-ignore
      this.props.item.id
    );
    // @ts-ignore
    this.props.quoteListDisplayName(
      // @ts-ignore
      this.quoteListName.current.value
    );
    this.setState({
      // @ts-ignore
      quoteListName: this.quoteListName.current.value
    });
    // @ts-ignore
    // console.log(this.state.quoteListName);
    // @ts-ignore
    this.quoteListName.current.value = "";
  }
  // @ts-ignore
  onKeyPressed(e) {
    if (e.key === "Enter") {
      this.onAddQuoteListName(e);
    }
  }

  render() {
    // @ts-ignore
    const { quoteListName } = this.state;
    // @ts-ignore
    const quoteListArray = this.props.quoteListArray;
    // @ts-ignore
    const quoteListId = this.props.item.id;
    // console.log(quoteListArray);
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (data!.me! === null) {
            return null;
          }
          if (data!.me!.userName) {
            console.log(data!.me!);
            return (
              <div>
                &nbsp;&nbsp;&nbsp;
                <input
                  // @ts-ignore
                  ref={this.quoteListName}
                  onKeyPress={this.onKeyPressed}
                  type="text"
                  placeholder="Name the Quote List"
                  className="quoteListNameInput"
                />
                &nbsp;
                <button
                  onClick={e => {
                    this.onAddQuoteListName(e);
                  }}
                >
                  Add
                </button>
                {console.log(data!.me!.quoteList)}
                <select>
                  // @ts-ignore
                  {data!.me!.quoteList
                    ? // @ts-ignore
                      data!.me!.quoteList.map(item => {
                        // @ts-ignore
                        return <option key={item.name}>{item.name}</option>;
                      })
                    : "Loading..."}
                </select>
                &nbsp;
                <Mutation<addQuoteList_addQuoteList, addQuoteListVariables>
                  mutation={ADD_QUOTE_LIST}
                >
                  {mutate => (
                    // @ts-ignore
                    <button
                      // @ts-ignore
                      onClick={e => {
                        // @ts-ignore
                        quoteListArray.map(async item => {
                          const tickers = item.tickers;
                          const name = item.QuoteListName;

                          if (item.id === quoteListId) {
                            const response = await mutate({
                              variables: { tickers, name }
                            });
                            console.log(response);
                          }
                        });
                      }}
                    >
                      Save Quote List
                    </button>
                  )}
                </Mutation>
              </div>
            );
          }
          return <div />;
        }}
      </Query>
    );
  }
}
export default StoreQuoteListName;

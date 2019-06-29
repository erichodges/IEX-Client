import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const meQuery = gql`
  query MeQuery {
    me {
      userName
      email
      id
      quoteList {
        id
        name
        tickers
      }
    }
  }
`;

const ADD_QUOTE_LIST = gql`
  mutation addQuoteList($tickers: [String]!, $name: String!) {
    addQuoteList(tickers: $tickers, name: $name) {
      tickers
      name
      id
    }
  }
`;

class SaveQuoteList extends Component {
  constructor(props) {
    super(props);

    this.quoteListName = React.createRef();

    this.state = {
      quoteListName: "Quote List"
    };

    this.onAddQuoteListName = this.onAddQuoteListName.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onAddQuoteListId = this.onAddQuoteListId.bind(this);
  }

  onAddQuoteListName(e) {
    this.props.addQuoteListName(
      this.quoteListName.current.value,
      this.props.item.id
    );

    this.props.quoteListDisplayName(this.quoteListName.current.value);
    this.setState({
      quoteListName: this.quoteListName.current.value
    });
    // console.log(this.state.quoteListName);
    this.quoteListName.current.value = "";
  }

  onKeyPressed(e) {
    if (e.key === "Enter") {
      this.onAddQuoteListName(e);
    }
  }

  onAddQuoteListId(responseWithQuoteList, itemId, name) {
    const quoteListId = responseWithQuoteList.data.addQuoteList.id;

    this.props.addQuoteListId(quoteListId, itemId, name);
  }

  render() {
    // const { quoteListName } = this.state;
    const quoteListArray = this.props.quoteListArray;
    const quoteListId = this.props.item.id;
    // console.log(quoteListArray);
    return (
      <Query query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (!data || !data.me) {
            return null;
          }
          if (data.me.userName) {
            return (
              <div>
                &nbsp;&nbsp;&nbsp;
                <input
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
                &nbsp;
                <Mutation mutation={ADD_QUOTE_LIST}>
                  {mutate => (
                    <button
                      onClick={e => {
                        quoteListArray.map(async item => {
                          const tickers = item.tickers;
                          const name = item.name;

                          if (item.id === quoteListId) {
                            const response = await mutate({
                              variables: { tickers, name },
                              refetchQueries: [
                                {
                                  query: meQuery
                                }
                              ]
                            });
                            this.onAddQuoteListId(response, item.id, name);
                            console.log("From: SaveQuoteList", response);
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
export default SaveQuoteList;

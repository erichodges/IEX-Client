import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import {
  MeQuery,
  updateQuoteList_updateQuoteList,
  updateQuoteListVariables
} from "../../schemaTypes";

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

const UPDATE_QUOTE_LIST = gql`
  mutation updateQuoteList($id: String!, $name: String, $tickers: [String]!) {
    updateQuoteList(tickers: $tickers, name: $name, id: $id) {
      id
      name
      tickers
    }
  }
`;

class UpdateQuoteList extends Component {
  render() {
    // @ts-ignore
    const quoteListArray = this.props.quoteListArray;
    console.log(quoteListArray);
    // @ts-ignore
    const quoteListId = this.props.item.id;
    // console.log(quoteListArray);
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (!data! || !data!.me!) {
            return null;
          }
          if (data!.me!.userName) {
            return (
              <div>
                &nbsp;&nbsp;&nbsp;
                <Mutation<
                  updateQuoteList_updateQuoteList,
                  updateQuoteListVariables
                >
                  mutation={UPDATE_QUOTE_LIST}
                >
                  {mutate => (
                    // @ts-ignore
                    <button
                      // @ts-ignore
                      onClick={e => {
                        // @ts-ignore
                        quoteListArray.map(async item => {
                          const tickers = item.tickers;
                          const name = item.quoteListName;
                          const id = item.quoteListId;

                          if (item.id === quoteListId) {
                            const response = await mutate({
                              variables: { id, name, tickers },
                              refetchQueries: [
                                {
                                  query: meQuery
                                }
                              ]
                            });
                            console.log(response, item.quoteList.id);
                          }
                        });
                      }}
                    >
                      Update Quote List
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
export default UpdateQuoteList;

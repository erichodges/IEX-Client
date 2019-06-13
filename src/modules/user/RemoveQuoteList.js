import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
// import { MeQuery } from "../../schemaTypes";

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

const REMOVE_QUOTE_LIST = gql`
  mutation removeQuoteList($id: String!) {
    removeQuoteList(id: $id)
  }
`;

class RemoveQuoteList extends Component {
  render() {
    // @ts-ignore
    const quoteListArray = this.props.quoteListArray;
    // console.log(quoteListArray);
    // @ts-ignore
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
                <Mutation mutation={REMOVE_QUOTE_LIST}>
                  {mutate => (
                    // @ts-ignore
                    <button
                      // @ts-ignore
                      onClick={e => {
                        // @ts-ignore
                        quoteListArray.map(async item => {
                          const id = item.quoteListId;

                          if (item.id === quoteListId) {
                            const response = await mutate({
                              variables: { id },
                              refetchQueries: [
                                {
                                  query: meQuery
                                }
                              ]
                            });
                            this.props.deleteTickers();
                            console.log(response, data.me);
                          }
                        });
                      }}
                    >
                      Delete Quote List
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
export default RemoveQuoteList;
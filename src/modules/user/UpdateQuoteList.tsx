import Button from "@material-ui/core/Button";
import { gql } from "apollo-boost";
import styles from "components/styles/QuoteList.module.css";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import {
  MeQuery,
  updateQuoteListVariables,
  updateQuoteList_updateQuoteList
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
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.onUpdateQuoteList = this.onUpdateQuoteList.bind(this);
  }

  // @ts-ignore
  onUpdateQuoteList(variant) {
    // @ts-ignore
    this.props.enqueueSnackbar("Quote List Updated", { variant });
  }

  render() {
    // @ts-ignore
    const quoteListArray = this.props.quoteListArray;
    // console.log(quoteListArray);
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
              <div className={styles.update}>
                <Mutation<
                  updateQuoteList_updateQuoteList,
                  updateQuoteListVariables
                >
                  mutation={UPDATE_QUOTE_LIST}
                >
                  {mutate => (
                    // @ts-ignore
                    <Button
                      className={styles.UpdateButton}
                      color="primary"
                      size="small"
                      variant="outlined"
                      // @ts-ignore
                      onClick={e => {
                        // @ts-ignore
                        quoteListArray.map(async item => {
                          const tickers = item.tickers;
                          const name = item.name;
                          const id = item.quoteListId;
                          const variant = "success";

                          if (item.id === quoteListId) {
                            const response = await mutate({
                              variables: { id, name, tickers }
                            });
                            // @ts-ignore
                            this.onUpdateQuoteList(variant);
                            console.log(response, data!.me!);
                          }
                        });
                      }}
                    >
                      Update
                    </Button>
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
// @ts-ignore
export default withSnackbar(UpdateQuoteList);

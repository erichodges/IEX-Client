import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    quoteListName: "Select a Quote List",
    loading: true,
    selectedTickerList: [],
    QuoteLists: [],
    selectedQuoteList: {}
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // @ts-ignore
    this.setState({ quoteListName: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>, quoteLists: any) => {
    event.preventDefault();
    // @ts-ignore
    const list = quoteLists.find(
      // @ts-ignore
      quoteList => quoteList.name === this.state.quoteListName
    );
    if (list) {
      this.props.loadQuoteList(list.tickers, list.name);
      console.log(list);
      this.props.addQuoteListId(list.id, this.props.item.id, list.name);
    }
  };

  render() {
    // const quoteListArray = this.props.quoteListArray;
    // @ts-ignore
    // console.log(this.state.selectedQuoteList.id);
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
                    // this.addQuoteListId();
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                  <Select
                    // @ts-ignore
                    value={this.state.quoteListName}
                    onChange={this.handleChange}
                  >
                    <MenuItem>Select a Quote List</MenuItem>
                    // @ts-ignore
                    {data!.me!.quoteList.map(item => {
                      return <MenuItem key={item.name}>{item.name}</MenuItem>;
                    })}
                  </Select>
                  &nbsp;
                  <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    type="submit"
                    value="submit"
                  >
                    Load
                  </Button>
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

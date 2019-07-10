import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
// import { Mutation } from "react-apollo";
// @ts-ignore
// import { MeQuery } from "../../schemaTypes";

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

const style = {
  color: "#90caf9",
  borderBottom: "1px solid #90caf9",
  "&:hover": {
    borderBottom: "2px solid #90caf9"
  }
};

class LoadQuoteList extends Component {
  // @ts-ignore
  state = {
    quoteListName: "Select a Quote List",
    loading: true,
    selectedTickerList: [],
    QuoteLists: [],
    selectedQuoteList: {}
  };

  handleChange = event => {
    // @ts-ignore
    this.setState({ quoteListName: event.target.value });
  };

  handleSubmit = (event, quoteLists) => {
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
    console.log(this.state.quoteListName);
    return (
      // @ts-ignore
      <Query query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (!data || !data.me) {
            return null;
          }
          if (data.me.quoteList) {
            return (
              <div>
                <form
                  onSubmit={e => {
                    this.handleSubmit(e, data.me.quoteList);
                    // this.addQuoteListId();
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                  <FormControl>
                    <Select
                      style={style}
                      value={this.state.quoteListName}
                      onChange={this.handleChange}
                      variant="outlined"
                      displayEmpty={true}
                      input={<Input id="QuoteListPlaceholder" />}
                      renderValue={
                        this.state.quoteListName > 0
                          ? undefined
                          : () => <em>Select a Quote List</em>
                      }
                    >
                      <MenuItem value="" disabled>
                        <em>Select a Quote List</em>
                      </MenuItem>

                      {data.me.quoteList.map(item => {
                        return (
                          <MenuItem value={item.name} key={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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

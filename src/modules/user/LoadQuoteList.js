import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

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

const QuoteListStyle = {
  color: "#eceff1",
  borderBottom: "1px solid #90caf9",
  "&:hover:not($disabled):not($focused):not($error) $underline": {
    borderBottom: "2px solid #90caf9"
  },
  width: "196px",
  marginTop: "1rem"
};

class LoadQuoteList extends Component {
  state = {
    quoteListName: "Select a Quote List",
    loading: true,
    selectedTickerList: [],
    QuoteLists: [],
    selectedQuoteList: {}
  };

  handleChange = event => {
    this.setState({ quoteListName: event.target.value });
    console.log("handleChange", event.target.value);
  };

  handleSubmit = (event, quoteLists) => {
    event.preventDefault();

    const list = quoteLists.find(
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
    // console.log("this.state.QuoteLists", this.state.QuoteLists);
    return (
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
                  <FormControl>
                    <Select
                      style={QuoteListStyle}
                      value={this.state.quoteListName}
                      onChange={this.handleChange}
                      displayEmpty={true}
                      renderValue={
                        this.state.quoteListName > 0
                          ? undefined
                          : () => <em>{this.state.quoteListName}</em>
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

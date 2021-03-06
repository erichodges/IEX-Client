import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import styles from "components/styles/QuoteList.module.css";
import React, { Component } from "react";
import { Query } from "react-apollo";


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

const LoadQuoteListStyles = {
  formControl: {
    minWidth: 196,
    width: 196,
    display: "flex"
  },
  focused: {},
  disabled: {},
  error: {},
  underlineInput: {
    "&:before": {
      // normal
      borderBottom: "1px solid #90caf9"
    },
    // focused
    "&:after": {
      borderBottom: "2px solid #90caf9"
    },
    // hover
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid #90caf9"
    }
  }
};

class LoadQuoteList extends Component {
  state = {
    quoteListName: "Select a Quote List",
    loading: true,
    selectedTickerList: [],
    selectedQuoteList: {}
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log("handleChange", event.target.value);
  };
  //this.setState({ quoteListName: event.target.value });

  handleSubmit = (event, quoteLists) => {
    event.preventDefault();

    const list = quoteLists.find(
      quoteList => quoteList.name === this.state.quoteListName
    );
    if (list) {
      this.props.loadQuoteList(list.tickers, list.name);
      // console.log(list);
      this.props.addQuoteListId(list.id, this.props.item.id, list.name);
      this.setState({
        quoteListName: "Select a Quote List"
      });
    }
  };

  
  render() {
    console.log("LoadQuoteList: ");
    const { classes } = this.props;
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
              <div className={styles.loadWrapper}>
                <form
                  onSubmit={e => {
                    this.handleSubmit(e, data.me.quoteList);
                    console.log("handle submit", e);
                  }}
                >
                  <FormControl className={classes.formControl}>
                    <div className={styles.select}>
                      <Select
                        value={this.state.quoteListName}
                        onChange={this.handleChange("quoteListName")}
                        displayEmpty={true}
                        input={
                          <Input
                            className={styles.inputQuoteList}
                            classes={{
                              focused: classes.focused,
                              disabled: classes.disabled,
                              error: classes.error,
                              underline: classes.underlineInput
                            }}
                          />
                        }
                        renderValue={
                          this.state.quoteListName > 0
                            ? undefined
                            : () => <span>{this.state.quoteListName}</span>
                        }
                      >
                        <MenuItem value="" disabled>
                          Select a Quote List
                        </MenuItem>

                        {data.me.quoteList.map(item => {
                          return (
                            <MenuItem value={item.name} key={item.name}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      <Button
                        className={styles.loadButton}
                        color="primary"
                        size="small"
                        variant="outlined"
                        type="submit"
                        value="submit"
                      >
                        Load
                      </Button>
                    </div>
                  </FormControl>
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

const StyledLoadQuoteList = withStyles(LoadQuoteListStyles)(LoadQuoteList);

export default StyledLoadQuoteList;

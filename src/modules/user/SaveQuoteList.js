import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import styles from "components/styles/QuoteList.module.css";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { Mutation, Query, withApollo } from "react-apollo";
import DarkTextField from "../../components/styleComponents/DarkTextField";



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

const saveQuoteListStyles = theme => ({
  button: {
    "&:disabled": {
      borderColor: "#62757f",
      color: "#62757f"
    }
  }

});

class SaveQuoteList extends Component {
  constructor(props) {
    super(props);

    // this.quoteListName = React.createRef();

    this.state = {
      quoteListName: ""
    };

    this.onAddQuoteListName = this.onAddQuoteListName.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onAddQuoteListId = this.onAddQuoteListId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.onAddQuoteListName(e);
  };

  onKeyPressed(e) {
    if (e.key === "Enter") {
      this.onAddQuoteListName(e);
    }
  }

  onAddQuoteListName(e) {
        this.props.addQuoteListName(this.input.value, this.props.item.id);
        this.props.quoteListDisplayName(this.input.value);
        this.setState({
          quoteListName: this.input.value
        });
        this.setState({
          quoteListName: ""
        })
  }

  onAddQuoteListId(responseWithQuoteList, itemId, name, variant) {
    const quoteListId = responseWithQuoteList.data.addQuoteList.id;
    
        this.props.addQuoteListId(quoteListId, itemId, name);
        this.props.enqueueSnackbar("Quote List Saved", {variant});
  }

  onSaveError(variant) {
    this.props.enqueueSnackbar("Save Error", {variant});
  }

  render() {
    // const { quoteListName } = this.state;
    const quoteListArray = this.props.quoteListArray;
    const quoteListId = this.props.item.id;
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
          if (data.me.userName) {
            const buttonDisabled = data.me.quoteList.some(item => item.name === this.state.quoteListName);
            return (
              <div
                className={styles.save}
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <DarkTextField
                  variant="outlined"
                  margin="dense"
                  inputRef={input => (this.input = input)}
                  onChange={(e) => this.setState({ quoteListName: e.target.value})}
                  value={this.state.quoteListName}
                  type="text"
                  placeholder="Name (must be unique)"
                  className="quoteListNameInput"
                  onKeyPress={this.onKeyPressed.bind(this)}
                />
                &nbsp;
                <Button
                  className={styles.addButtonSaveQL}
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={this.handleSubmit}
                  disabled={buttonDisabled}
                  classes={{ disabled: classes.button}}
                >
                  Add
                </Button>
                &nbsp;
                <Mutation mutation={ADD_QUOTE_LIST}>
                  {mutate => (
                    <Button
                      className={styles.saveButton}
                      color="primary"
                      size="small"
                      variant="outlined"
                      disabled={buttonDisabled}
                      classes={{ disabled: classes.button}}
                      onClick={e => {
                        quoteListArray.map(async item => {
                          const tickers = item.tickers;
                          const name = item.name;
                          const variant1 = "success"
                          const variant2 = "error"

                          if (item.id === quoteListId) {
                            const response = await mutate({
                              variables: { tickers, name },
                              refetchQueries: [
                                {
                                  query: meQuery
                                }
                              ]
                            });  
                            this.onAddQuoteListId(response, item.id, name, variant1 );
                            console.log("From: SaveQuoteList", response);
                          } else {
                            this.onSaveError(variant2);
                          }
                        });
                      }}
                    >
                      Save
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
const StyledSaveQuoteList = withStyles(saveQuoteListStyles)(withApollo(withSnackbar(SaveQuoteList)))

export default StyledSaveQuoteList;
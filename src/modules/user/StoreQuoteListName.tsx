import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      userName
      email
      id
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
  // @ts-ignore
  onSaveQuoteList(e) {
    // @ts-ignore
    this.props.saveQuoteList(e);
  }

  render() {
    @ts-ignore
    const { quoteListName } = this.state;
    return (
      @ts-ignore
      <Query<MeQuery> query={meQuery}>
        // @ts-ignore
        {({ data, loading }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (data) {
        if (data.me!.userName) {
      return (
      
    );
    <div>
      &nbsp;&nbsp;&nbsp;
      <input
        // @ts-ignore
        ref={this.quoteListName}
        onKeyPress={this.onKeyPressed}
        type="text"
        placeholder="Name of Quote List"
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
      <button
        onClick={e => {
          this.onSaveQuoteList(e);
        }}
      >
        Save Quote List
      </button>
    </div>
    );
      }
    }
    return null;
      }}
    </Query>
    );
  }
}
export default StoreQuoteListName;

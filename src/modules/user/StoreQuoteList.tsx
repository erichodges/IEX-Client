import React, { Component } from "react";
// import { Query } from "react-apollo";
// import { gql } from "apollo-boost";
// import { MeQuery } from "../../schemaTypes";

// const meQuery = gql`
//   query MeQuery {
//     me {
//       userName
//       email
//       id
//     }
//   }
// `;

class StoreQuoteList extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // @ts-ignore
    this.quoteListName = React.createRef();

    this.state = {
      quoteListName: "Quote List"
    };
    // @ts-ignore
    this.addQuoteListName = this.addQuoteListName.bind(this);
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
    this.setState({
      // @ts-ignore
      quoteListName: this.quoteListName.current.value
    });
    // @ts-ignore
    this.quoteListName.current.value = "";
  }
  // @ts-ignore
  onKeyPressed(e) {
    if (e.key === "Enter") {
      this.onAddQuoteListName(e);
    }
  }

  render() {
    console.log(this.props);
    // @ts-ignore
    const { quoteListName } = this.state;
    return (
      <div>
        <b>StoreQuoteList</b>
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
      </div>
    );
  }
}
export default StoreQuoteList;

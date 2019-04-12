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

class StoreQuoteListName extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // @ts-ignore
    this.quoteListName2 = React.createRef();

    this.state = {
      quoteListName2: "Quote List"
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
      this.quoteListName2.current.value,
      // @ts-ignore
      this.props.item.id
    );
    // @ts-ignore
    this.props.quoteListDisplayName(
      // @ts-ignore
      this.quoteListName2.current.value
    );
    this.setState({
      // @ts-ignore
      quoteListName2: this.quoteListName2.current.value
    });
    // @ts-ignore
    // console.log(this.state.quoteListName2);
    // @ts-ignore
    this.quoteListName2.current.value = "";
  }
  // @ts-ignore
  onKeyPressed(e) {
    if (e.key === "Enter") {
      this.onAddQuoteListName(e);
    }
  }

  render() {
    // @ts-ignore
    const { quoteListName2 } = this.state;
    return (
      <div>
        <b>StoreQuoteList</b>
        <input
          // @ts-ignore
          ref={this.quoteListName2}
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
export default StoreQuoteListName;

import React, { Component } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://swapi.co/
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      reply: {}
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://api.iextrading.com/1.0//stock/aapl/chart/1m")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          reply: data
        });
      });
  }

  render() {
    const text = this.state.loading ? "loading..." : this.state.reply[0].change;
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }
}

export default App;

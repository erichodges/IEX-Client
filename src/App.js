import React, { Component } from "react";

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
          reply: data[0]
        });
      });
  }

  render() {
    const text = this.state.loading ? "loading..." : this.state.reply.change;
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }
}

export default App;

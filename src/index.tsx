import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import Routes from "./Routes";
// import registerServiceWorker from "./registerServiceWorker";
// import App from "./App";

const client = new ApolloClient({
  uri: "http://lcalhost:4000/graphql",
  credentials: "include"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);

// registerServiceWorker();

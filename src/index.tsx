import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

import theme from "./theme";
import Routes from "./Routes";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
console.log(process.env.REACT_APP_IEX_API);
// registerServiceWorker();

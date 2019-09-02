import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { SnackbarProvider } from "notistack";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import "typeface-roboto";
import Routes from "./Routes";
import theme from "./theme";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  credentials: "include",
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
// console.log(process.env.REACT_APP_IEX_API);
// registerServiceWorker();

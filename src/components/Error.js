import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Header from "./Header";

const Error = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <br/>
        <br/>
        <Typography variant="h6">
        The requested page does not exist.
        </Typography>
      </Container>
    </div>
  );
};

export default Error;

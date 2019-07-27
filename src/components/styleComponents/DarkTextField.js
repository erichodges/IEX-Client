import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const styles = {
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #37474f inset",
      WebkitTextFillColor: "#f5f5f5",
      caretColor: "#f5f5f5"
    },
    "&::before": {
      borderBottom: "1px solid #90caf9"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #90caf9"
    },
    "&::after": {
      borderBottom: "2px solid #90caf9"
    }
  }
};

const DarkTextField = withStyles(styles)(props => {
  const { classes, ...other } = props;
  return <TextField InputProps={ {classes: classes} } {...other} />;
});

export default DarkTextField;

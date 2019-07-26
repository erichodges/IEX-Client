import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import React from "react";

const styles = {
  underline: {
    "&::before": {
      borderBottom: "1px solid #90caf9"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #90caf9"
    },
    "&::after": {
      borderBottom: "2px solid #90caf9"
    }
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px black inset"
    }
  }

};

const DarkTextField = withStyles(styles)(props => {
  const { classes, ...other } = props;

  return <TextField InputProps={ classNames("classes.underline", "classes.input") } {...other} />;
});

export default DarkTextField;

import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

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
  }
};

const DarkTextField = withStyles(styles)(props => {
  const { classes, ...other } = props;

  return <TextField InputProps={{ className: classes.underline }} {...other} />;
});

export default DarkTextField;

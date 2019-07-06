import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#90caf9",
      contrastText: "#f5f5f5"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: "#f44336"
    },
    background: {
      default: "#102027",
      paper: "#37474f"
    },
    text: {
      primary: "#eceff1",
      secondary: "#90caf9"
    },
    button: {
      borderColor: "#90caf9"
    }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "#90caf9"
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#90caf9",
          borderWidth: 2
        },
        "&$focused $notchedOutline": {
          borderColor: "#90caf9"
        }
      },
      notchedOutline: {}
    }
  }
});

export default theme;

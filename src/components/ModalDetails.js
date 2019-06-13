import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { getKeyStats } from "./Utils";

function getModalStyle() {
  return {
    top: "5vh",
    left: "7.5vw"
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "80vw",
    height: "80vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

const handleExtraZeros = item => {
  const trim = item / 1000000000;
  return trim.toFixed(2);
};

function DetailsModal() {
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [keyStats] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  console.log(this.props.symbol);

  return (
    <div>
      <Button onClick={(handleOpen, this.getKeyStats(() => this.props.symbol))}>
        Details
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography>
            <div>
              <h3>{handleExtraZeros(() => this.props.keyStats.marketcap)} B</h3>
            </div>
          </Typography>
        </div>
      </Modal>
    </div>
  );
}

export default DetailsModal;

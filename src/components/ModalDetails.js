import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import NumberFormat from "react-number-format";
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
    width: "35vw",
    height: "55vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  },
  table: {
    width: 350
  }
}));

const DetailsModal = props => {
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [keyStats, setKeyStats] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExtraZeros = num => {
    const trim = num / 1000000000;
    return trim.toFixed(2);
  };

  const getStats = symbol => {
    getKeyStats(symbol).then(data => {
      setKeyStats(data);
      handleOpen();
    });
  };
  console.log("Key Stats:", keyStats);
  const classes = useStyles();
  // (handleOpen, getStats(props.symbol))
  return (
    <div>
      <Button onClick={() => getStats(props.symbol)}>Details</Button>
      <Modal
        align="right"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Company</b>
                </TableCell>
                <TableCell align="right">{keyStats.companyName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Market Cap</b>
                </TableCell>
                <TableCell align="right">
                  {handleExtraZeros(keyStats.marketcap)} B
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>EPS</b>
                </TableCell>
                <TableCell align="right">{keyStats.ttmEPS}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>PE</b>
                </TableCell>
                <TableCell align="right">{keyStats.peRatio}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Float</b>
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={keyStats.float}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Shares Outstanding</b>
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={keyStats.sharesOutstanding}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Employees</b>
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={keyStats.employees}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>TTM Dividend</b>
                </TableCell>
                <TableCell align="right">{keyStats.ttmDividendRate}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Next Dividend</b>
                </TableCell>
                <TableCell align="right">{keyStats.nextDividendDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Ex Dividend</b>
                </TableCell>
                <TableCell align="right">{keyStats.exDividendDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Modal>
    </div>
  );
};

export default DetailsModal;

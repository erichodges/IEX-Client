import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalKeyStats from "./ModalKeyStats";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "8vh",
    left: "8vw",
    width: "37vw",
    height: "55vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  },
  table: {
    width: 400,
    left: -20
  }
}));

const onTickerForChart = ({ currentTarget }) => {
  this.props.setTickerForChart(currentTarget.value);
};

const QuoteListTable = props => {
  // const [modalStyle] = useState(getModalStyle);

  const handleExtraZeros = num => {
    const trim = num / 1000000000;
    return trim.toFixed(2);
  };

  const Delete = styled(DeleteIcon)({
    fill: "blue !important",
    background: "#fff !important",
    cursor: "pointer",
    padding: "none !important"
  });
  const CustomTable = styled(Table)({
    root: {
      width: 400,
      color: "blue"
    },
    paper: {
      marginTop: 0,
      width: 400,
      overflowX: "auto",
      marginBottom: 0
    },
    table: {
      width: 400,
      background: "#000"
    },
    icon: {
      fill: "blue !important",
      margin: 0,
      fontSize: 24,
      color: "green",
      borderColor: "#000"
    }
  });

  // const classes = useStyles();
  // (handleOpen, getStats(props.symbol))
  return (
    <Container maxWidth="md">
      <div className={CustomTable.root}>
        <Paper className={CustomTable.paper}>
          <CustomTable className={CustomTable.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ticker</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">% Change</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Detials</TableCell>
                <TableCell align="right">Chart</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map(item => {
                return (
                  <TableRow key={item.symbol}>
                    <TableCell align="left">{item.symbol}</TableCell>
                    <TableCell align="right">{item.latestPrice}</TableCell>
                    <TableCell align="right">{item.change}</TableCell>
                    <TableCell align="right">
                      {item.changePercent.toFixed(2)} %{" "}
                    </TableCell>
                    <TableCell align="right">{item.companyName}</TableCell>
                    <TableCell align="right">
                      <ModalKeyStats symbol={item.symbol} />
                    </TableCell>
                    <TableCell>
                      <Button
                        align="right"
                        onClick={() => onTickerForChart}
                        value={item.symbol}
                        type="button"
                        className="chart-btn"
                      >
                        Chart
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Delete
                        align="right"
                        onClick={e => {
                          this.removeItem(item);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              <tr>
                <td />
              </tr>
            </TableBody>
          </CustomTable>
        </Paper>
      </div>
    </Container>
  );
};

export default QuoteListTable;

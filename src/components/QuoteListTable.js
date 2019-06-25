import React from "react";
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

const onTickerForChart = ({ currentTarget }) => {
  this.props.setTickerForChart(currentTarget.value);
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "100%",
    minWidth: 700,
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    width: "100%"
  }
}));

const Delete = styled(DeleteIcon)({
  fill: "blue !important",
  background: "#fff !important",
  cursor: "pointer",
  padding: "none !important"
});

// const handleExtraZeros = num => {
//   const trim = num / 1000000000;
//   return trim.toFixed(2);
// };

const QuoteListTable = props => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
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
                        props.removeItem(item);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default QuoteListTable;

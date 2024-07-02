import classes from "./check.module.css"
import { useSelector } from "react-redux"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableFooter from "@mui/material/TableFooter"
import Paper from "@mui/material/Paper"
export default function YourOrder() {
  const cart = useSelector(state => state.cart)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const tax = (totalPrice / 100) * 7
  const total = totalPrice + tax

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className={classes.tableTitle}> Product</span>
              </TableCell>
              <TableCell align="right">
                <span className={classes.tableTitle}> Amount</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map(item => (
              <TableRow key={item._id} className={classes.lastRow}>
                <TableCell component="th" scope="row">
                  {item.productId.title} x {item.quantity}
                </TableCell>
                <TableCell align="right">$ {item.productId.sellingPrice * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="left">Subtotal</TableCell>
              <TableCell align="right">$ {totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Shipping: flat rate</TableCell>
              <TableCell align="right">$ 10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Tax</TableCell>
              <TableCell align="right">$ {tax}</TableCell>
            </TableRow>
            <TableRow className={classes.finalAmount}>
              <TableCell align="left">
                <p>Total</p>
              </TableCell>
              <TableCell align="right">
                <p>$ {total}</p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

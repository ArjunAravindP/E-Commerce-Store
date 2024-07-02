import React from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableFooter from "@mui/material/TableFooter"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import CartTable from "../Cart/CartTable"
import { setOrderStatus } from "../../util/hooks"
import { useNavigate } from "react-router-dom"

const OrderDialog = ({ adminOrder, open, handleClose, order, handleStatus }) => {
  const navigate = useNavigate()
  const handleCancel = () => {
    const result = window.confirm("Are you sure you want to cancel the order?")
    if (result) {
      // Implement cancellation logic here
      setOrderStatus("cancelled", order._id)
      handleStatus("cancelled")
      handleClose()
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="order-dialog-title" aria-describedby="order-dialog-description">
      <DialogTitle id="order-dialog-title">Order Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <span>Order ID:</span> {order._id}
        </Typography>
        <Typography variant="body1">
          <span>Placed on:</span> {order.formattedDate}
        </Typography>
        <Typography variant="body1">
          <span>Status:</span> {order.status}
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{order.cart && order.cart.map(item => <CartTable key={item._id} item={item} isCart={false} />)}</TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">Billing Name</TableCell>
                <TableCell align="right">{order.billingName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Billing Phone</TableCell>
                <TableCell align="right">{order.billingPhone}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">Billing Address</TableCell>
                <TableCell align="right">
                  {order.billingAddress},{order.billingCountry}, {order.billingState}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="right">{order.billingEmail}</TableCell>
              </TableRow>
            </TableBody>

            <TableBody>
              <TableRow>
                <TableCell align="left">Shipping Name</TableCell>
                <TableCell align="right">{order.shippingName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Shipping Phone</TableCell>
                <TableCell align="right">{order.shippingPhone}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">Shipping Address</TableCell>
                <TableCell align="right">
                  {order.shippingAddress},{order.shippingCountry}, {order.shippingState}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="right">{order.shippingEmail}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <Button onClick={handleCancel} variant="outlined">
            Cancel Order
          </Button>
        )}
        {adminOrder && order.status !== "delivered" && (
          <>
            <Button variant="outlined" onClick={() => handleStatus("transit")}>
              Set as in trasit
            </Button>{" "}
            <Button variant="outlined" onClick={() => handleStatus("delivered")}>
              Set as delivered
            </Button>{" "}
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default OrderDialog

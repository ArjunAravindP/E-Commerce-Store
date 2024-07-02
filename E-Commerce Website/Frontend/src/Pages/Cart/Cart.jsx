import { useSelector } from "react-redux"

import classes from "./Cart.module.css"
import { useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableFooter from "@mui/material/TableFooter"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Grid } from "@mui/material"
import CartTable from "../../Components/Cart/CartTable"
import { useDispatch } from "react-redux"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useEffect } from "react"
import { cartActions } from "../../Context/cart-slice"
import { Link, json } from "react-router-dom"
import Button from "@mui/material/Button"
import FormDialog from "../Checkout/AdressDrwer"

export default function Cart() {
  const cart = useSelector(state => state.cart.items)

  const totalPrice = useSelector(state => state.cart.totalPrice)
  const userId = useAuthUser()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleDialogOpen = () => {
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await fetch(`http://localhost:8080/cart/${userId}`)
          const data = await response.json()
          dispatch(cartActions.replace(data))
        } catch (error) {
          throw json({ message: "error fetching cart" }, { status: 500 })
        }
      }
      fetchCart()
    }
  }, [userId])

  return (
    <div className={classes.cart}>
      <Grid item container md={11} style={{ justifyContent: "end" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map(item => (
                <CartTable key={item._id} item={item} isCart={true} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="right">{totalPrice}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Button style={{ fontSize: "16px", backgroundColor: "black", color: "white", marginTop: 20, padding: 10, fontWeight: 600 }} onClick={handleDialogOpen}>
          Checkout
        </Button>
      </Grid>
      <FormDialog title="Checkout" action="billing" open={open} handleClose={handleDialogClose} handleDialogeClose={handleDialogClose} />
    </div>
  )
}

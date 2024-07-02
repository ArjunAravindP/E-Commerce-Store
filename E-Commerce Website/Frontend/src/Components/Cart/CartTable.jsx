import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import classes from "../../Pages/Cart/Cart.module.css"
import { addToCart } from "../../util/hooks"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useDispatch } from "react-redux"
import { cartActions } from "../../Context/cart-slice"
import { removeCartItem } from "../../util/hooks"

export default function CartTable({ item, isCart }) {
  const dispatch = useDispatch()
  const userId = useAuthUser()
  const handleAddToCart = async productId => {
    const data = await addToCart(productId, userId)
    dispatch(cartActions.addToCart(productId))
  }
  const handleRemoveFromCart = async (productId, quantity) => {
    const data = await removeCartItem(productId, userId, 1)
    dispatch(cartActions.removeFromCart({ productId: productId, quantity: quantity }))
  }
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <div className={classes.cartItem}>
          <img className={classes.cartImage} src={`http://localhost:8080/${item.productId.image}`} alt="cart-product" />
          <p>{item.productId.title}</p>
        </div>
      </TableCell>
      <TableCell align="right">{item.productId.sellingPrice}</TableCell>
      <TableCell align="center">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          {isCart && <Button onClick={() => handleRemoveFromCart(item.productId._id)}>-</Button>}
          <Button disabled>{item.quantity}</Button>
          {isCart && <Button onClick={() => handleAddToCart(item.productId._id, item.quantity)}>+</Button>}{" "}
        </ButtonGroup>
      </TableCell>
      <TableCell align="right">{isNaN(item.quantity * item.productId.sellingPrice) ? "N/A" : (item.quantity * item.productId.sellingPrice).toFixed(2)}</TableCell>
    </TableRow>
  )
}

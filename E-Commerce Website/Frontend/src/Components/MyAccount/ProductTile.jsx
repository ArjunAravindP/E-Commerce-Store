import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import classes from "../../Pages/Cart/Cart.module.css"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import AlertDialogSlide from "../DialogBox/DialogBox"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"

export default function ProductTile({ product, handleEdit, deleteProduct }) {
  const [alertMessage, setAlerMessage] = useState({ title: "", message: "" })
  const [alertOpen, setAlertOpen] = useState(false)
  const handleDelete = () => {
    setAlerMessage({ title: "Delete Product", message: "Are you sure you want to delete the product. The product will be removed from the store permenently" })
    setAlertOpen(true)
  }
  const handleClose = () => {
    setAlertOpen(false)
  }
  const handleDeleteOk = () => {
    deleteProduct(product._id)
    setAlertOpen(false)
  }
  return (
    <>
      <TableRow className={classes.adminProductTable}>
        <TableCell component="th" scope="row">
          <div className={classes.cartItem}>
            <img className={classes.cartImage} src={`http://localhost:8080/${product.image}`} alt="cart-product" />
            <p>{product.title}</p>
          </div>
        </TableCell>
        <TableCell align="right">
          <div className={classes.adminProductButtons}>
            <EditIcon onClick={() => handleEdit(product._id)} />
            <DeleteIcon onClick={() => handleDelete(product._id)} />
          </div>
        </TableCell>
      </TableRow>
      <AlertDialogSlide alertMessage={alertMessage} alertOpen={alertOpen} handleClose={handleClose} handleDeleteOk={handleDeleteOk} />
    </>
  )
}

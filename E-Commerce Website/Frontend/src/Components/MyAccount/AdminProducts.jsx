import { useEffect, useState } from "react"
import { fetchAllProducts, deleteProduct } from "../../util/hooks"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import ProductTile from "./ProductTile"
import classes from "./MyAccount.module.css"
import Button from "@mui/material/Button"
import FormDialog from "../../Pages/Checkout/AdressDrwer"
import AlertDialogSlide from "../DialogBox/DialogBox"
import { useDispatch } from "react-redux"
import { alertActions } from "../../Context/alert-slice"
import { json } from "react-router-dom"

export default function AdminProducts() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(undefined)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllProducts()
      setProducts(data)
    }
    fetchData()
  }, [])

  const handleDialogOpen = () => {
    setIsEditing(undefined)
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleEdit = id => {
    setIsEditing(id)
    setOpen(true)
  }

  const deleteSelectedProduct = id => {
    deleteProduct(id)
      .then(res => {
        if (res) {
          dispatch(alertActions.success("Product Deleted SuccesFully"))
          setTimeout(() => {
            dispatch(alertActions.clear())
          }, 3000)
          setProducts(prevProducts => prevProducts.filter(product => product._id !== id))
        } else {
          dispatch(alertActions.error("Product Deletion failed"))
          setTimeout(() => {
            dispatch(alertActions.clear())
          }, 3000)
        }
      })
      .catch(err => {
        throw json({ message: "Product deletion failed" }, { status: 500 })
      })
  }

  return (
    <>
      <TableContainer sx={{ width: "100%", margin: 5 }} component={Paper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <Button onClick={handleDialogOpen} sx={{ margin: 2 }} variant="contained" color="primary">
            Add New Product
          </Button>
        </div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <ProductTile deleteProduct={deleteSelectedProduct} key={product._id} handleEdit={handleEdit} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog title={isEditing ? "Edit Product" : "Add New Product"} isEditing={isEditing} action="addProduct" open={open} handleClose={handleDialogClose} handleDialogeClose={handleDialogClose} />
    </>
  )
}

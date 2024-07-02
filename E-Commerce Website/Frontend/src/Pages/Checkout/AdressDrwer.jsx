import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Paper from "@mui/material/Paper"
import BillingDetails from "../../Components/Checkout/Billing"
import AddProduct from "../../Components/AddProduct/AddProduct"
export default function FormDialog({ title, isEditing, action, open, handleClose, handleDialogeClose }) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: event => {
          event.preventDefault()
          handleSubmit()
          handleClose()
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid margin={1} container spacing={2}>
            <Grid component={Paper} md={12} xs={12} sx={{ padding: 3 }}>
              {action === "billing" && <BillingDetails handleDialogeClose={handleDialogeClose} />}
              {action === "addProduct" && <AddProduct isEditing={isEditing} handleDialogeClose={handleDialogeClose} />}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button> */}
      </DialogActions>
    </Dialog>
  )
}

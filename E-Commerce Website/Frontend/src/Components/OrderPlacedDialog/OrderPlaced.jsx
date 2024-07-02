import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { orderActions } from "../../Context/order-placed"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import classes from "./orderPlaced.module.css"
import { red } from "@mui/material/colors"

export default function OrderPlacedDialog({ open, onClose }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
    }
  }, [open])

  const handleClose = () => {
    setDialogOpen(false)
    dispatch(orderActions.orderPlaced(false))
    onClose && onClose()
  }

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: event => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData.entries())
            const email = formJson.email
            console.log(email)
            handleClose()
          }
        }}
      >
        <div className={classes.dialog}>
          <DialogTitle>
            <span>
              Order
              <br /> Placed Successfully
            </span>
          </DialogTitle>
          <CheckCircleRoundedIcon
            color="primary"
            style={{
              marginBottom: 20,
              fontSize: 100
            }}
          />
          <Button
            sx={{
              width: 100,
              backgroundColor: "#302f2f",
              color: "white",
              "&:hover": {
                backgroundColor: "#333333"
              }
            }}
            onClick={handleClose}
            color="success"
            variant="contained"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </>
  )
}

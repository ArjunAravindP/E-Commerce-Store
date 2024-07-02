import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide({ alertMessage, alertOpen, handleClose, handleDeleteOk }) {
  return (
    <React.Fragment>
      <Dialog open={alertOpen} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{alertMessage.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{alertMessage.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

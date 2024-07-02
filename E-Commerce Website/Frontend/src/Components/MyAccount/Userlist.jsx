import { useEffect, useState } from "react"
import { fetchUsers } from "../../util/hooks"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import classes from "./MyAccount.module.css"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteUser } from "../../util/hooks"
import { json } from "react-router-dom"
import { useDispatch } from "react-redux"
import { alertActions } from "../../Context/alert-slice"
import AlertDialogSlide from "../DialogBox/DialogBox"
export default function UserList() {
  const [alertMessage, setAlerMessage] = useState({ title: "", message: "" })
  const dispatch = useDispatch()
  const theme = useTheme()
  const [usertoDelete, setUserToDelete] = useState("")
  const [users, setUsers] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers()
      if (data.length > 0) {
        data.shift()
      }

      setUsers(data)
    }
    fetchData()
  }, [])
  const handleUserDelete = () => {
    deleteUser(usertoDelete)
      .then(res => {
        if (res) {
          dispatch(alertActions.success("User Deleted SuccesFully"))
          setTimeout(() => {
            dispatch(alertActions.clear())
          }, 3000)
          setUsers(prevUser => prevUser.filter(user => user._id !== usertoDelete))
        } else {
          dispatch(alertActions.error("User Deletion failed"))
          setTimeout(() => {
            dispatch(alertActions.clear())
          }, 3000)
        }
        setUserToDelete("")
      })
      .catch(err => {
        throw json({ message: "Product deletion failed" }, { status: 500 })
      })
  }
  const handleDelete = id => {
    setUserToDelete(id)
    setAlerMessage({ title: "Delete User", message: "Are you sure you want to delete the user. The user wont be able to access your store anymore" })
    setAlertOpen(true)
  }
  const handleClose = () => {
    setAlertOpen(false)
  }
  const handleDeleteOk = () => {
    handleUserDelete()
    setAlertOpen(false)
  }
  return (
    <>
      <div className={classes.userList}>
        {users.map(user => (
          <Card key={user._id} sx={{ display: "flex", width: "380px", maxHeight: "150px", padding: "0px" }}>
            <AccountCircleIcon sx={{ fontSize: "100px" }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {user.firstName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  #{user._id}
                </Typography>
              </CardContent>
            </Box>
            <DeleteIcon className={classes.deltebtn} onClick={() => handleDelete(user._id)} />
          </Card>
        ))}
      </div>
      <AlertDialogSlide alertMessage={alertMessage} alertOpen={alertOpen} handleClose={handleClose} handleDeleteOk={handleDeleteOk} />
    </>
  )
}

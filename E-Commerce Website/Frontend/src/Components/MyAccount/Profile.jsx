import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { json } from "react-router-dom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import classes from "./MyAccount.module.css"
import { Button } from "@mui/material"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import { useNavigate } from "react-router-dom"

export default function MyProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const userId = useAuthUser()
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:8080/fetchUser/${userId}`)
        const user = await response.json()
        setUser(user)
      } catch (err) {
        throw json
      }
    }
    fetchUser()
  }, [userId])
  const signOut = useSignOut()
  const handleSignOut = () => {
    signOut()
    navigate("/auth")
  }
  return (
    <Grid className={classes.myProfile} xs={12} margin={2} component={Paper} container>
      <Grid xs={12}>
        <h1>Profile</h1>
        <AccountCircleIcon sx={{ fontSize: 80 }} />
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Email : {user.email}</p>
        <Button onClick={handleSignOut} variant="contained">
          SignOut
        </Button>
      </Grid>
    </Grid>
  )
}

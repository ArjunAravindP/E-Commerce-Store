import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { useState } from "react"
import { Grid } from "@mui/material"
import Paper from "@mui/material/Paper"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import StoreIcon from "@mui/icons-material/Store"
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"
import CategoryIcon from "@mui/icons-material/Category"

export default function MyAccountNav() {
  const id = useAuthUser()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")) // Detects if viewport is mobile
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0) // State to track selected tab index

  const handleListItemClick = index => {
    setSelectedIndex(index)
    if (index === 0) {
      navigate("/my-account")
    } else if (index === 1) {
      navigate("/my-account/orders")
    } else if (index === 2) {
      navigate("/my-account/store-orders")
    } else if (index === 3) {
      navigate("/my-account/products")
    } else if (index === 4) {
      navigate("/my-account/users")
    }
  }

  const DrawerList = (
    <Box
      component={Paper}
      sx={{
        width: isMobile ? 50 : 200, // Adjusted width based on viewport
        height: "100vh",
        overflow: "auto"
      }}
      role="presentation"
    >
      <List>
        {["My Account", "My Orders"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            selected={selectedIndex === index} // Highlight selected item
            onClick={() => handleListItemClick(index)}
          >
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <AccountCircleIcon /> : <LocalGroceryStoreIcon />}</ListItemIcon>
              {!isMobile && <ListItemText primary={text} />} {/* Show text only on desktop */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {id === "666d2899c3355d791e0bfedb" && (
        <List>
          {["Store Orders", "My Products", "My Users"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              selected={selectedIndex === index + 2} // Adjust index for the second list
              onClick={() => handleListItemClick(index + 2)}
            >
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <StoreIcon /> : <CategoryIcon />}</ListItemIcon>
                {!isMobile && <ListItemText primary={text} />} {/* Show text only on desktop */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )

  return (
    <Grid anchor="right" open={open} onClose={() => setOpen(false)}>
      {DrawerList}
    </Grid>
  )
}

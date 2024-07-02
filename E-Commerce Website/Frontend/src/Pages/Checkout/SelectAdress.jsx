import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Paper from "@mui/material/Paper"
import YourOrder from "../../Components/Checkout/YourOrder"
import PaymentMethod from "../../Components/Checkout/Payment"
import BillingDetails from "../../Components/Checkout/Billing"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function SelectAddress() {
  const [billing, setBillingDetailsValid] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Checkout</h1>
      <Grid margin={5} container spacing={2}>
        <Grid component={Paper} md={8} xs={12} sx={{ padding: 3 }}>
          <BillingDetails setBillingDetailsValid={setBillingDetailsValid} />
        </Grid>
      </Grid>
    </Box>
  )
}

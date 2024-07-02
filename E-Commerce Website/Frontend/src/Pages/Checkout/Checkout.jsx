import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Paper from "@mui/material/Paper"
import YourOrder from "../../Components/Checkout/YourOrder"
import PaymentMethod from "../../Components/Checkout/Payment"
import BillingDetails from "../../Components/Checkout/Billing"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import { createOrder } from "../../util/hooks"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { loadStripe } from "@stripe/stripe-js"
import { useDispatch } from "react-redux"
import { orderActions } from "../../Context/order-placed"
import { cartActions } from "../../Context/cart-slice"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
export default function Checkout() {
  const navigate = useNavigate()
  const userId = useAuthUser()
  const dispatch = useDispatch()
  const paymentMethod = useSelector(state => state.payment.paymentOption)
  const data = useSelector(state => state.address.address)
  const cart = useSelector(state => state.cart.items)

  const handlePlaceOrder = async () => {
    if (paymentMethod) {
      if (paymentMethod === "cashOnDelivery") {
        const createCODOrder = await createOrder(userId, data, paymentMethod)
        dispatch(orderActions.orderPlaced(true))
        navigate("/")
      } else if (paymentMethod === "stripePay") {
        const stripe = await loadStripe("pk_test_51OwPQpSEJlz6WhT3fXkRW4nLFNhNidCXYl7JMl2evUAXDcdjnVWKd2Sf5ZmtA1eyzIVvJyBuVYbwyfpTjZ0CqFmJ00dDuHx3N3")
        const response = await fetch("http://localhost:8080/stripePayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ products: cart })
        })
        const session = await response.json()
        const createStripeOrder = createOrder(userId, data, paymentMethod)

        stripe
          .redirectToCheckout({
            sessionId: session.sessionId
          })
          .then(function (result) {
            if (result.error) {
              console.error(result.error.message)
            } else {
              setCart([])
            }
          })
      }
    } else {
      console.log("Validation failed. Please fill in all required fields.")
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ textAlign: "center", marginTop: 13, fontSize: "larger", fontWeight: 600 }}>Checkout</Typography>
      <Grid margin={5} container spacing={2}>
        <Grid md={12} container spacing={8} xs={12}>
          <Grid component={Paper} md={12} xs={12}>
            <YourOrder />
          </Grid>
          <Grid component={Paper} md={12} xs={12}>
            <PaymentMethod />
          </Grid>
          <Grid component={Paper} md={12} xs={12}>
            <Button onClick={handlePlaceOrder} fullWidth style={{ fontSize: "16px", backgroundColor: "black", color: "white", marginTop: 20, padding: 10, fontWeight: 600 }}>
              <Link>Checkout</Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

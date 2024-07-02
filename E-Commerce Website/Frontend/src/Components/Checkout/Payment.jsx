import React, { useState } from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useDispatch } from "react-redux"
import { paymentActions } from "../../Context/payment-slice"

export default function PaymentMethod() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cashOnDelivery")
  const dispatch = useDispatch()

  const handleChange = event => {
    const paymentMethod = event.target.value
    setSelectedPaymentMethod(paymentMethod)
    dispatch(paymentActions.payment(paymentMethod))
  }

  return (
    <FormControl>
      <FormLabel id="payment-method-label">Payment Method</FormLabel>
      <RadioGroup aria-labelledby="payment-method-label" name="payment-method" value={selectedPaymentMethod} onChange={handleChange}>
        <FormControlLabel value="cashOnDelivery" control={<Radio />} label="Cash on delivery" />
        <FormControlLabel value="stripePay" control={<Radio />} label="Stripe pay" />
      </RadioGroup>
    </FormControl>
  )
}

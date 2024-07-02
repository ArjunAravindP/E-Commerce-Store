import { createSlice } from "@reduxjs/toolkit"

const initialState = { paymentOption: "cashOnDelivery" }
const paymentSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    payment(state, payload) {
      const data = payload.payload
      state.paymentOption = data
    }
  }
})

export const paymentActions = paymentSlice.actions
export default paymentSlice

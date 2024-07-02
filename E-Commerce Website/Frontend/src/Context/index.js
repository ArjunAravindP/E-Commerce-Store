import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cart-slice"
import addressSlice from "./address-slice"
import paymentSlice from "./payment-slice"
import orderSlice from "./order-placed"
import alertSlice from "./alert-slice"

const store = configureStore({
  reducer: { cart: cartSlice.reducer, address: addressSlice.reducer, payment: paymentSlice.reducer, order: orderSlice.reducer, alert: alertSlice.reducer }
})

export default store

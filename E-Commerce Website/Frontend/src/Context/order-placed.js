import { createSlice } from "@reduxjs/toolkit"

const initialState = { placed: false }
const orderSlice = createSlice({
  name: "orderPlaced",
  initialState,
  reducers: {
    orderPlaced(state, payload) {
      if (payload.payload === true) {
        state.placed = true
      } else if (payload.payload === true) {
        state.placed = false
      }
    }
  }
})

export const orderActions = orderSlice.actions
export default orderSlice

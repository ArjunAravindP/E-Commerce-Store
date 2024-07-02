import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: null, status: null }
const alertSlice = createSlice({
  name: "orderPlaced",
  initialState,
  reducers: {
    success(state, action) {
      const message = action.payload
      state.message = message
      state.status = "success"
    },
    error(state, action) {
      console.log(action.payload)
      const message = action.payload
      state.message = message
      state.status = "error"
    },
    clear(state) {
      state.message = null
      state.status = null
    }
  }
})

export const alertActions = alertSlice.actions
export default alertSlice

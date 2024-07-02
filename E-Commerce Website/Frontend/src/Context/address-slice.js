import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  address: { billingFirstName: "", billingLastName: "", billingCompanyName: "", billingStreetAddress: "", billingPhone: "", billingEmailAddress: "", billingCountry: null, billingState: null, shippingFirstName: "", shippingLastName: "", shippingCompanyName: "", shippingStreetAddress: "", shippingPhone: "", shippingEmailAddress: "", shippingCountry: null, shippingState: null, orderNotes: "" }
}
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateform(state, action) {
      const data = action.payload
      state.address = data
    }
  }
})

export const addressActions = addressSlice.actions
export default addressSlice

import { createSlice } from "@reduxjs/toolkit"

const initialState = { items: [], totalQuantity: 0, totalPrice: 0 }
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replace(state, action) {
      const items = action.payload
      if (items) {
        state.items = items
        state.totalQuantity = items.reduce((accumulator, item) => {
          return accumulator + item.quantity
        }, 0)
        state.totalPrice = items.reduce((accumulator, item) => {
          return accumulator + item.productId.sellingPrice * item.quantity
        }, 0)
      }
    },
    addToCart(state, action) {
      const productId = action.payload

      const product = state.items.find(item => item.productId._id === productId)

      if (product) {
        product.quantity += 1
        state.totalPrice += product.productId.sellingPrice
        state.totalQuantity += 1
      } else {
        state.items.push({ productId: { _id: productId }, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      const { productId } = action.payload
      const product = state.items.find(item => item.productId._id === productId)

      if (product && product.quantity > 1) {
        product.quantity -= 1
        state.totalPrice -= product.productId.sellingPrice
        state.totalQuantity -= 1
      } else {
        state.items = state.items.filter(item => item.productId._id !== productId)
      }
    }
  }
})

export const cartActions = cartSlice.actions
export default cartSlice

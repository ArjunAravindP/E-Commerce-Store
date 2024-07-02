import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useEffect } from "react"
import { cartActions } from "../Context/cart-slice"
import NavbarHook from "../Components/NavBar/Nav"
import { useSelector } from "react-redux"
import AlertBox from "../Components/Alert/Alert"

function RootLayout() {
  const cart = useSelector(state => state.cart.items)
  const userId = useAuthUser()
  const dispatch = useDispatch()
  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await fetch(`http://localhost:8080/cart/${userId}`)
          const data = await response.json()
          dispatch(cartActions.replace(data))
        } catch (error) {
          throw json({ message: "error fetching cart" }, { status: 500 })
        }
      }
      fetchCart()
    }
  }, [userId])
  return (
    <>
      <NavbarHook />
      <main style={{ marginTop: "90px" }}>
        <AlertBox />
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout

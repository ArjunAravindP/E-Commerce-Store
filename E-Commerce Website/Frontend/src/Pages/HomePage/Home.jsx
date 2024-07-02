import Header from "../../Components/Home/Header"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cartActions } from "../../Context/cart-slice"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useSelector } from "react-redux"
import OrderPlacedDialog from "../../Components/OrderPlacedDialog/OrderPlaced"
import CategoryRecommedation from "../../Components/Recommendations/Category"

export default function HomePage() {
  const orderPlaced = useSelector(state => state.order.placed)
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
          console.error("Error fetching cart:", error)
        }
      }
      fetchCart()
    }
  }, [userId])
  return (
    <>
      <Header />
      {orderPlaced && <OrderPlacedDialog open={true} />}
      <CategoryRecommedation category="living-room" title="Living Room" />
      <CategoryRecommedation category="bed-room" title="Bed Room" />
    </>
  )
}

import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { Fragment, useEffect, useState } from "react"
import { fetchOrder, getStructuredDate } from "../../util/hooks"
import { Grid, Paper, CardContent } from "@mui/material"
import { useNavigate } from "react-router-dom"
import OrderDialog from "../Dialog/OrderDetails"
import classes from "./MyAccount.module.css"
import { setOrderStatus } from "../../util/hooks"
import { useDispatch } from "react-redux"
import { alertActions } from "../../Context/alert-slice"

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState({})
  const userId = useAuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const data = await fetchOrder(userId)
      setOrders(data)
    }
    fetchData()
  }, [userId])

  const handleClickOpen = order => {
    const formattedDate = getStructuredDate(order.createdAt)
    setCurrentOrder({ ...order, formattedDate })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentOrder({})
    navigate("/my-account/orders")
  }

  const handleStatus = async status => {
    const indexToUpdate = orders.findIndex(order => order._id === currentOrder._id)

    if (indexToUpdate !== -1) {
      // Create a copy of orders array
      const updatedOrders = [...orders]

      // Update the status of the order in the copy
      updatedOrders[indexToUpdate].status = status

      // Set the updated orders array in state
      setOrders(updatedOrders)
      dispatch(alertActions.success(`oreder status set as : ${status}`))
      setTimeout(() => {
        dispatch(alertActions.clear())
      }, 3000)
    }
    await setOrderStatus(status, currentOrder._id)
    setOpen(false)
  }

  const getStatusClass = status => {
    switch (status) {
      case "cancelled":
        return classes.statusCancelled
      case "transit":
        return classes.statusTransit
      case "placed":
        return classes.statusPlaced
      case "delivered":
        return classes.statusDelivered
      // Add more cases as needed
      default:
        return ""
    }
  }

  return (
    <>
      <Grid className={classes.orders}>
        {orders.map(order => (
          <Fragment key={order._id}>
            <Grid onClick={() => handleClickOpen(order)} component={Paper} className={classes.orderitem} sx={{ minWidth: 275, maxHeight: 100, margin: 0 }}>
              <CardContent className={classes.content}>
                <p># {order._id}</p>
                <p>Placed on: {getStructuredDate(order.createdAt)}</p>
                <p>
                  Status: <span className={getStatusClass(order.status)}>{order.status}</span>
                </p>
              </CardContent>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <OrderDialog handleStatus={handleStatus} open={open} handleClose={handleClose} order={currentOrder} />
    </>
  )
}

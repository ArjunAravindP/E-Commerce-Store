import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./Pages/HomePage/Home"
import RootLayout from "./Pages/Root"
import AllProductPage, { loader as loadAllProducts } from "./Pages/AllProducts/AllProducts"
import AuthenticationPage, { action as authAction } from "./Pages/Authentication/Authentication"
import ErrorPage from "./Pages/Error/Error"
import SingleProductPage from "./Pages/SingleProductPage/SingleProductPage"
import AuthOutlet from "@auth-kit/react-router/AuthOutlet"
import Cart from "./Pages/Cart/Cart"
import Checkout from "./Pages/Checkout/Checkout"
import SelectAddress from "./Pages/Checkout/SelectAdress"
import MyAccountRoot from "./Pages/MyAccount/AccountRoot"
import Myorders from "./Components/MyAccount/MyOrders"
import AdminOrders from "./Components/MyAccount/AdminOrders"
import AdminProducts from "./Components/MyAccount/AdminProducts"
import Collection from "./Components/Collection/Collection"
import MyProfile from "./Components/MyAccount/Profile"
import UserList from "./Components/MyAccount/Userlist"
import NotFound from "./Pages/NotFound/NotFOund"

const router = createBrowserRouter([
  { path: "/auth", element: <AuthenticationPage />, action: authAction },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <AllProductPage />,
            loader: loadAllProducts
          },
          {
            path: ":productId",
            children: [
              {
                index: true,
                element: <SingleProductPage />
              }
            ]
          },
          {
            path: "collection/:collection",
            element: <Collection />
          }
        ]
      },
      {
        path: "cart",
        element: <AuthOutlet fallbackPath="/auth" />,
        children: [
          {
            index: true,
            element: <Cart />
          },
          {
            path: "shipping",
            element: <SelectAddress />
          },
          {
            path: "checkout",
            element: <Checkout />
          }
        ]
      },
      {
        path: "my-account",
        element: <AuthOutlet fallbackPath="/auth" />,
        children: [
          {
            index: "/my-account",
            element: <MyAccountRoot />,
            children: [
              {
                index: true,
                element: <MyProfile />
              },
              {
                path: "orders",
                element: <Myorders />
              },
              {
                path: "store-orders",
                element: <AdminOrders />
              },
              { path: "products", element: <AdminProducts /> },
              { path: "users", element: <UserList /> }
            ]
          }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
])
export default function App() {
  return <RouterProvider router={router} />
}

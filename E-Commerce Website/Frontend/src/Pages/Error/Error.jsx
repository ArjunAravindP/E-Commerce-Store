import { useRouteError } from "react-router-dom"
import classes from "./Error.module.css"

import Navbar from "../../Components/NavBar/Nav"

function ErrorPage() {
  const error = useRouteError()

  let title = "An error occurred!"
  let message = "Something went wrong!"

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 404) {
    title = "Not found!"
    message = "Could not find resource or page."
  }

  return (
    <>
      <Navbar />
      <div className={classes.errorPage}>
        <h1>{title}</h1>
        <h2>{message}</h2>
      </div>
    </>
  )
}

export default ErrorPage

import Navbar from "../../Components/NavBar/Nav"
import classes from "./NotFound.module.css"
export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className={classes.notFound}>
        <h1>404</h1>
        <p>Page Not Found</p>
        <p>Sorry, the page you are looking for could not be found.</p>
      </div>
    </>
  )
}

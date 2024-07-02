import { Outlet } from "react-router-dom"
import MyAccountNav from "../../Components/MyAccountNav/MyAccountNav"
import classes from "./AccountRoot.module.css"

export default function MyAccountRoot() {
  return (
    <>
      <main className={classes.main}>
        <MyAccountNav />
        <Outlet />
      </main>
    </>
  )
}

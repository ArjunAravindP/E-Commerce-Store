import classes from "./Header.module.css"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import NewArrivals from "../Recommendations/NewArrivals"
import DeckIcon from "@mui/icons-material/Deck"
import BedIcon from "@mui/icons-material/Bed"
import CountertopsIcon from "@mui/icons-material/Countertops"
import ChairIcon from "@mui/icons-material/Chair"
import HomeWorkIcon from "@mui/icons-material/HomeWork"
export default function Header() {
  return (
    <>
      <section className={classes.section}>
        <Grid className={classes.grid} item xs={12} container spacing={2}>
          <Grid className={classes.title} item xs={12}>
            <h1>FIND YOUR</h1>
            <h1>
              <span className={classes.titleSpan}>DREAM FURNITURE</span>
            </h1>
            <p className={classes.para}>Explore the wide world of mordern and new collection of furnitures</p>
          </Grid>
          <Grid className={classes.collection} item xs={12}>
            <Grid item xs={4} md={2}>
              <Link to="products/collection/bed-room">
                <p className={classes.gridItem}>
                  <BedIcon />
                  <span>Bed Room</span>
                </p>
              </Link>
            </Grid>
            <Grid item xs={4} md={2}>
              <Link to="products/collection/outdoor">
                <p className={classes.gridItem}>
                  <DeckIcon />
                  <span>Outdoor</span>
                </p>
              </Link>
            </Grid>
            <Grid item xs={4} md={2}>
              <Link to="products/collection/kitchen">
                <p className={classes.gridItem}>
                  <CountertopsIcon />
                  <span>Kitchen</span>
                </p>
              </Link>
            </Grid>
            <Grid item xs={4} md={2}>
              <Link to="products/collection/living-room">
                <p className={classes.gridItem}>
                  <ChairIcon />
                  <span>Living Room</span>
                </p>
              </Link>
            </Grid>

            <Grid item xs={4} md={2}>
              <Link to="products/collection/office">
                <p className={classes.gridItem}>
                  <HomeWorkIcon />
                  <span>Office</span>
                </p>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <NewArrivals />
    </>
  )
}

import { Box, Container, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import classes from "./Footer.module.css"

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#2e2b2b",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        mt: "30px"
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center", color: "#ffffff" }}>
        <Grid container spacing={4} direction="row" justifyContent="space-between" alignItems="flex-start">
          {/* Main Navigation */}
          <Grid item xs={12} md={4}>
            <Typography color="#ffffff" variant="h5" gutterBottom>
              Navigation
            </Typography>
            <ul className={classes.nav__list}>
              <li className={classes.nav__item}>
                <Link to="/" className="nav__link">
                  Home
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="products" className="nav__link">
                  All Products
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="my-account" className="nav__link">
                  My Account
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="/cart" className="nav__link">
                  Cart
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} md={4}>
            <Typography color="#ffffff" variant="h5" gutterBottom>
              Categories
            </Typography>
            <ul className={classes.nav__list}>
              <li className={classes.nav__item}>
                <Link to="/products/collection/living-rooms" className="nav__link">
                  Living Room
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="/products/collection/bed-room" className="nav__link">
                  Bedroom
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="/products/collection/kitchen" className="nav__link">
                  Kitchen
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="/products/collection/outdoor" className="nav__link">
                  Outdoors
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Contact & About Us */}
          <Grid item xs={12} md={4}>
            <Typography color="#ffffff" variant="h5" gutterBottom>
              Contact & About Us
            </Typography>
            <ul className={classes.nav__list}>
              <li className={classes.nav__item}>
                <Link to="contact" className="nav__link">
                  Contact Us
                </Link>
              </li>
              <li className={classes.nav__item}>
                <Link to="about" className="nav__link">
                  About Us
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

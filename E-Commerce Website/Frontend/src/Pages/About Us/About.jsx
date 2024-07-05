import * as React from "react"
import Avatar from "@mui/material/Avatar"
import CssBaseline from "@mui/material/CssBaseline"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import StorefrontIcon from "@mui/icons-material/Storefront"

const defaultTheme = createTheme()

export default function AboutUs() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://st4.depositphotos.com/1023934/37752/i/450/depositphotos_377527168-stock-photo-interior-design-modern-living-room.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <StorefrontIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              About Us
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Welcome to Furniture World!
              </Typography>
              <Typography variant="body1" paragraph>
                At Furniture World, we believe that a beautiful home starts with the right furniture. Since our founding in 2020, we have been dedicated to providing high-quality, stylish, and affordable furniture to customers all around the world. Our online store offers a wide variety of furniture for every room in your home, including living room, bedroom, dining room, and office furniture.
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to make furniture shopping easy and enjoyable. We work closely with top manufacturers to ensure that our products meet the highest standards of quality and design. Whether you are looking for a modern sofa, a classic dining table, or a cozy bed, we have something to suit every taste and budget.
              </Typography>
              <Typography variant="body1" paragraph>
                We are committed to excellent customer service. Our knowledgeable and friendly team is always here to help you with any questions or concerns. We offer fast and reliable shipping, easy returns, and a satisfaction guarantee, so you can shop with confidence.
              </Typography>
              <Typography variant="body1" paragraph>
                Thank you for choosing Furniture World. We look forward to helping you create the home of your dreams.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

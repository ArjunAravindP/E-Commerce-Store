import React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import classes from "./SingleProductCard.module.css"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import { addToCart } from "../../util/hooks"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

export default function MediaCard({ product }) {
  const userId = useAuthUser()
  const [addedToCart, setAddedToCart] = useState(false)

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product._id}`)
  }

  // Function to truncate the description to first 30 characters followed by "..."
  const truncateDescription = description => {
    if (description.length > 50) {
      return `${description.substring(0, 90)}...`
    }
    return description
  }
  const handleAddToCart = async () => {
    if (userId) {
      const data = await addToCart(product._id, userId)
      setAddedToCart(true)

      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    } else {
      navigate("/auth")
    }
  }

  const isOutOfStock = product.stock <= 0

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 300,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          opacity: isOutOfStock ? 0.5 : 1,
          pointerEvents: isOutOfStock ? "none" : "auto"
        }}
      >
        {addedToCart && (
          <Alert className={classes.alert} sx={{ position: "absolute", width: 300 }} variant="filled" severity="success">
            {product.title} added to cart
          </Alert>
        )}
        <CardMedia onClick={handleClick} sx={{ height: 140, cursor: isOutOfStock ? "default" : "pointer" }} image={`http://localhost:8080/${product.image}`} title={product.title} />
        <CardContent sx={{ flexGrow: 1, marginBottom: "10px" }}>
          <Typography className={classes.productName} gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncateDescription(product.description)}
          </Typography>
        </CardContent>
        <CardActions className={classes.singleProductBuy}>
          <Typography sx={{ fontSize: 20 }} variant="body2" color="text.secondary">
            $ {product.sellingPrice}
          </Typography>
          <Button variant="outlined" onClick={handleAddToCart} className={classes.addToCartButton} size="small" disabled={isOutOfStock}>
            Add to Cart <ShoppingCartIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

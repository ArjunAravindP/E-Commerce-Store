import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import classes from "./SingleProductPage.module.css"
import { useDispatch } from "react-redux"
import { cartActions } from "../../Context/cart-slice"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { addToCart } from "../../util/hooks"
import Alert from "@mui/material/Alert"
import { useSelector } from "react-redux"
import RelatedProducts from "../../Components/Recommendations/RelatedProducts"
import { useNavigate } from "react-router-dom"

export default function SingleProductPage() {
  const navigate = useNavigate()
  const userId = useAuthUser()
  const [product, setProduct] = useState([])
  const [itemStock, setItemStock] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const cart = useSelector(state => state.cart.items)

  const { productId } = useParams()
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:8080/product/${productId}`)
        if (!response) {
          throw json({ message: "Failed to load product" }, { status: 500 })
        }
        const product = await response.json()
        setProduct(product)
        setItemStock(product.stock)
      } catch (error) {
        console.error("Login error:", error)
      }
    }
    fetchProduct()
  }, [])
  useEffect(() => {
    const existingCartItem = cart.find(prd => prd.productId._id === productId)
    if (existingCartItem) {
      console.log(existingCartItem)
      setItemStock(prevStock => {
        return prevStock - existingCartItem.quantity
      })
    }
  }, [cart])
  const handleAddToCart = async () => {
    if (userId) {
      const data = await addToCart(productId, userId)
      setAddedToCart(true)
      setItemStock(prevStock => {
        return prevStock - 1
      })
      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    } else {
      navigate("/auth")
    }
  }

  return (
    <>
      {addedToCart && (
        <Alert className={classes.alert} variant="filled" severity="success">
          {product.title} added to cart
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <div className={classes.image}>
            <img src={`http://localhost:8080/${product.image}`} alt="" />
          </div>
        </Grid>
        <Grid container spacing={2} xs={12} md={6}>
          <Grid className={classes.productDetails} xs={12}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </Grid>
          <Grid xs={12}>
            <div className={classes.productPrice}>
              <p>$ {product.sellingPrice}</p>
              <p>$ {product.originalPrice}</p>
            </div>
            <p className={classes.units}>
              Avaialable units : <span>{itemStock}</span>
            </p>
            {itemStock <= 0 ? (
              <p className={classes.outOfStock}>Out of Stock</p>
            ) : (
              <div className={classes.buyOptions}>
                <button className={classes.buyNow} disabled={product.stock === 0}>
                  Buy Now
                </button>
                <button onClick={handleAddToCart} className={classes.addToCart} disabled={product.stock === 0}>
                  Add to Cart
                </button>
              </div>
            )}
            <div className={classes.productDescription}>
              <p>Dispatched in {product.dispatch} days</p>
              <p>Shipping charges - $10</p>
              <p>Barnd -{product.brand}</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <RelatedProducts productId={productId} />
    </>
  )
}

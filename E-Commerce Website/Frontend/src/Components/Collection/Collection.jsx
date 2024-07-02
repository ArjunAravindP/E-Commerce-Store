import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductCollection from "../ProductCollection/ProductCollection"
export default function Collection() {
  const category = useParams().collection
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:8080/category/${category}`)
        const products = await response.json()
        setProducts(products)
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }
    fetchProducts()
  }, [])
  return <ProductCollection title={category} products={products} />
}

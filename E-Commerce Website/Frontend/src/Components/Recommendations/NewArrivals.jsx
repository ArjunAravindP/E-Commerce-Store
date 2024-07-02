import ProductColumn from "../ProductColum/ProductColum"

import { useState, useEffect } from "react"

export default function NewArrivals() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:8080/new-arrivals")
        const products = await response.json()

        setProducts(products)
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }
    fetchProducts()
  }, [])
  return <ProductColumn products={products} title="New Arrivals" />
}

import { json } from "react-router-dom"
import ProductColumn from "../ProductColum/ProductColum"

import { useState, useEffect } from "react"

export default function CategoryRecommedation({ category, title }) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:8080/category/${category}`)
        const products = await response.json()

        setProducts(products)
      } catch (err) {
        throw json({ message: "failed to load produts" }, { status: 500 })
      }
    }
    fetchProducts()
  }, [])
  return <ProductColumn products={products} title={title} />
}

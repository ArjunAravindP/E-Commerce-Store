import { useLoaderData, defer, Await, json } from "react-router-dom"
import { Suspense, useState } from "react"
import ProductCollection from "../../Components/ProductCollection/ProductCollection"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

export default function AllProductPage() {
  const auth = useAuthUser()
  const [isLoading, setIsLoading] = useState(true)

  const { products } = useLoaderData()

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={products}>
        <ProductCollection products={products} title="All Products" />
      </Await>
    </Suspense>
  )
}

async function loaderProducts() {
  try {
    const respose = await fetch("http://localhost:8080/products")
    if (respose.status === 402) {
      return respose
    }
    if (!respose.ok) {
      throw json({ message: "Failed to load products" }, { status: 500 })
    } else {
      const products = await respose.json()
      return products
    }
  } catch (err) {
    throw json({ message: "failed to load products" }, { status: 500 })
  }
}
export async function loader() {
  return defer({
    products: await loaderProducts()
  })
}

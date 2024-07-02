export async function addToCart(productId, userId) {
  try {
    const response = await fetch("http://localhost:8080/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding to cart:", error)
  }
}

export async function removeCartItem(productId, userId, quantity) {
  try {
    const response = await fetch("http://localhost:8080/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        quantity: quantity
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding to cart:", error)
  }
}
export async function createOrder(userId, data, paymentMethod) {
  console.log("asjhhsduisd")
  try {
    const response = await fetch(`http://localhost:8080/createOrder/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shippingAddress: data, paymentMethod: paymentMethod })
    })
    const order = await response.json()
    return order
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
export async function fetchOrder(id) {
  try {
    const response = await fetch(`http://localhost:8080/fetch-order/${id}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}

export function getStructuredDate(isoDate) {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(2)
  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}
export async function setOrderStatus(status, id) {
  try {
    const response = await fetch(`http://localhost:8080/admin/set-order-status/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
export async function fetchOrders() {
  try {
    const response = await fetch(`http://localhost:8080/fetch-orders`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
export async function fetchAllProducts() {
  try {
    const response = await fetch("http://localhost:8080/products")
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
export async function fetchSingleProduct(id) {
  try {
    const response = await fetch(`http://localhost:8080/product/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
export async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:8080/admin/delete/${id}`, {
      method: "POST"
    })

    if (!response.ok) throw new Error(data.message || "Couldn't delete produt")
    return true
  } catch (err) {
    return false
  }
}
export async function fetchUsers() {
  try {
    const response = await fetch(`http://localhost:8080/admin/users`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}
export async function deleteUser(id) {
  try {
    const response = await fetch(`http://localhost:8080/admin/user/delete/${id}`, {
      method: "POST"
    })

    if (!response.ok) throw new Error(data.message || "Couldn't delete produt")
    return true
  } catch (err) {
    return false
  }
}

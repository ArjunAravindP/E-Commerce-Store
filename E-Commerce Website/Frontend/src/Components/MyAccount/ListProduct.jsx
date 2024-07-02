export default function CartProduct({ product }) {
  return (
    <div id="cart-product">
      <div className="cart-image">
        <img src={`http://localhost:8080/${product.image}`} alt="" />
      </div>
      <div id="cart-product-deatils">
        <p>{product.title}</p>
        <p>$ {product.sellingPrice}</p>
      </div>
    </div>
  )
}

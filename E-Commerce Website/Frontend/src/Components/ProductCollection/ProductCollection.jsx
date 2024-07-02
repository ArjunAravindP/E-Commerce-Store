import classes from "./ProductCollection.module.css"
import MediaCard from "../SingleProdut/SingleProductCard"
export default function ProductCollection({ products, title }) {
  return (
    <>
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.allProducts}>
        {products.map(product => (
          <MediaCard key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}

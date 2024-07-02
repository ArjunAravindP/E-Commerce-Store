import classes from "./ProductColum.module.css"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MediaCard from "../SingleProdut/SingleProductCard"

export default function ProductColumn({ title, products }) {
  return (
    <Grid container className={classes.productColumns}>
      <Grid xs={12}>
        <h1>{title}</h1>
      </Grid>
      <Grid xs={12} className={classes.productColumn}>
        {products.map(prd => (
          <MediaCard key={prd._id} product={prd} />
        ))}
      </Grid>
    </Grid>
  )
}

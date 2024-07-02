import { useState } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import Alert from "@mui/material/Alert"
import { json } from "react-router-dom"
import { fetchSingleProduct } from "../../util/hooks"
import classes from "./AddProduct.module.css"
import AlertBox from "../Alert/Alert"

export default function AddProduct({ isEditing, handleformupdate, handleDialogeClose }) {
  const [forError, setFormError] = useState(false)
  const [productAdded, setProductAdded] = useState(null)
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    sellingPrice: "",
    image: null,
    brand: "",
    dispatch: "",
    stock: "",
    category: ""
  })

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    originalPrice: "",
    sellingPrice: "",
    brand: "",
    dispatch: "",
    stock: "",
    category: "",
    image: ""
  })
  if (isEditing) {
    useState(() => {
      async function fetch() {
        const data = await fetchSingleProduct(isEditing)
        console.log(data)
        setProductData({
          title: data.title,
          description: data.description,
          originalPrice: data.originalPrice,
          sellingPrice: data.sellingPrice,
          image: null,
          brand: data.brand,
          dispatch: data.dispatch,
          category: data.category,
          stock: data.stock
        })
      }
      fetch()
    }, [isEditing])
  }

  const handleChange = (field, value) => {
    setProductData(prevProductData => ({
      ...prevProductData,
      [field]: value
    }))
    validateField(field, value)
  }

  const handleFileInput = e => {
    const file = e.target.files[0]
    console.log(file) // Log the selected file
    setProductData(prevProductData => ({
      ...prevProductData,
      image: file
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      image: ""
    }))
  }

  const validateField = (field, value) => {
    let error = ""
    switch (field) {
      case "title":
        if (!value) error = "Product Name is required"
        break
      case "description":
        if (!value) error = "Product Description is required"
        break
      case "originalPrice":
        if (!value) error = "Original Price is required"
        break
      case "sellingPrice":
        if (!value) error = "Selling Price is required"
        break
      case "brand":
        if (!value) error = "Brand is required"
        break
      case "dispatch":
        if (!value) error = "Dispatch in days is required"
        break
      case "stock":
        if (!value) error = "Available Stock is required"
        break
      case "category":
        if (!value) error = "Category is required"
        break
      case "image":
        if (!value) error = "Product Image is required"
        break
      default:
        break
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    Object.keys(productData).forEach(field => validateField(field, productData[field]))
  }

  const handleBlur = event => {
    const { name, value } = event.target
    validateField(name, value)
  }

  const handleFocus = event => {
    setFormError(false)
    const { name } = event.target
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }))
  }

  const handleFormSubmit = async () => {
    validateAllFields()

    // Check if there are any errors
    const isValid = Object.values(errors).every(error => error === "") && Object.values(productData).every(value => value !== "" && value !== null)

    if (isValid) {
      // Prepare form data
      const formData = new FormData()
      for (const key in productData) {
        if (key === "image" && productData[key] === null && isEditing) {
          continue // Skip appending image if editing and no new file selected
        }
        formData.append(key, productData[key])
      }

      try {
        let response
        if (isEditing) {
          response = await fetch(`http://localhost:8080/admin/update-product/${isEditing}`, {
            method: "POST",
            body: formData
          })
        } else {
          console.log(productData)
          response = await fetch("http://localhost:8080/admin/add-product", {
            method: "POST",
            body: formData
          })
        }
        if (!response.ok) throw new Error(response.statusText || "Couldn't update product")
        const result = await response.json()
        if (result) {
          setProductAdded("added")
          setTimeout(() => {
            setProductAdded(null)
          }, 3000)
        }
      } catch (error) {
        throw json({ message: "Adding products failed" }, { status: 500 })
      }

      setProductData({
        title: "",
        description: "",
        originalPrice: "",
        sellingPrice: "",
        image: null,
        brand: "",
        dispatch: "",
        stock: "",
        category: ""
      })

      // Close dialog or navigate to another page
      handleDialogeClose()
    } else {
      setFormError(true)
    }
  }

  const categories = ["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor", "Kids", "Kitchen"]

  return (
    <div className={classes.form}>
      <div>
        {forError && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            Please fill in all data
          </Alert>
        )}

        <div className={classes.formFileds}>
          <TextField fullWidth required id="outlined-required" label="Product Name" name="title" type="text" value={productData.title} onChange={e => handleChange("title", e.target.value)} onBlur={handleBlur} error={!!errors.title} helperText={errors.title} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" label="Product Description" name="description" type="text" value={productData.description} onChange={e => handleChange("description", e.target.value)} onBlur={handleBlur} error={!!errors.description} helperText={errors.description} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" label="Original Price" name="originalPrice" type="number" value={productData.originalPrice} onChange={e => handleChange("originalPrice", e.target.value)} onBlur={handleBlur} error={!!errors.originalPrice} helperText={errors.originalPrice} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" label="Selling Price" name="sellingPrice" type="text" value={productData.sellingPrice} onChange={e => handleChange("sellingPrice", e.target.value)} onBlur={handleBlur} error={!!errors.sellingPrice} helperText={errors.sellingPrice} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" name="brand" label="Brand" type="text" value={productData.brand} onChange={e => handleChange("brand", e.target.value)} onBlur={handleBlur} error={!!errors.brand} helperText={errors.brand} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" label="Dispatch in days" name="dispatch" type="number" value={productData.dispatch} onChange={e => handleChange("dispatch", e.target.value)} onBlur={handleBlur} error={!!errors.dispatch} helperText={errors.dispatch} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" label="Available Stock" name="stock" type="number" value={productData.stock} onChange={e => handleChange("stock", e.target.value)} onBlur={handleBlur} error={!!errors.stock} helperText={errors.stock} onFocus={handleFocus} />
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select labelId="category-select-label" id="category-select" value={productData.category} label="Category" onChange={e => handleChange("category", e.target.value)} onBlur={() => validateField("category", productData.category)} onFocus={() => setErrors(prevErrors => ({ ...prevErrors, category: "" }))}>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.category}</FormHelperText>
          </FormControl>
          <input required type="file" accept="image/*" onChange={handleFileInput} />
          {errors.image && <div style={{ color: "red" }}>{errors.image}</div>}
        </div>
      </div>
      <div className={classes.buttonGroup}>
        <Button onClick={handleDialogeClose} variant="outlined">
          Close
        </Button>
        <Button onClick={handleFormSubmit} variant="contained">
          Add Product
        </Button>
      </div>
    </div>
  )
}

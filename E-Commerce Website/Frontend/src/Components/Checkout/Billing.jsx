import TextField from "@mui/material/TextField"
import classes from "./check.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addressActions } from "../../Context/address-slice"
import { useState, useEffect } from "react"
import Select from "react-select"
import { Country, State } from "country-state-city"
import Checkbox from "@mui/material/Checkbox"
import { json } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"

export default function BillingDetails({ handleDialogeClose }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [shppingAdress, setShippingAdress] = useState(false)
  const [formData, setFormData] = useState({
    billingFirstName: "",
    billingLastName: "",
    billingCompanyName: "",
    billingStreetAddress: "",
    billingPhone: "",
    billingEmailAddress: "",
    billingCountry: null,
    billingState: null,
    shippingFirstName: "",
    shippingLastName: "",
    shippingCompanyName: "",
    shippingStreetAddress: "",
    shippingPhone: "",
    shippingEmailAddress: "",
    shippingCountry: null,
    shippingState: null,
    orderNotes: ""
  })

  const [errors, setErrors] = useState({
    billingFirstName: "",
    billingLastName: "",
    billingCompanyName: "",
    billingStreetAddress: "",
    billingPhone: "",
    billingEmailAddress: "",
    billingCountry: null,
    billingState: null,
    shippingFirstName: "",
    shippingLastName: "",
    shippingCompanyName: "",
    shippingStreetAddress: "",
    shippingPhone: "",
    shippingEmailAddress: "",
    shippingCountry: null,
    shippingState: null,
    orderNotes: ""
  })

  const handleChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value
    }))
    validateField(field, value)
  }

  const validateField = (field, value) => {
    let error = ""
    switch (field) {
      case "billingCountry":
        if (!value) error = "Billing country is required"
        break
      case "billingState":
        if (!value) error = "Billing state is required"
        break
      case "billingFirstName":
        if (!value) error = "First name is required"
        break
      case "billingLastName":
        if (!value) error = "Last name is required"
        break
      case "billingStreetAddress":
        if (!value) error = "Street address is required"
        break
      case "billingPhone":
        if (!/^\d{10,15}$/.test(value)) error = "Phone number is invalid"
        break
      case "billingEmailAddress":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Email address is invalid"
        break
      case "shippingCountry":
        if (shppingAdress && !value) error = "Shipping country is required"
        break
      case "shippingState":
        if (shppingAdress && !value) error = "Shipping state is required"
        break
      case "shippingFirstName":
        if (shppingAdress && !value) error = "First name is required"
        break
      case "shippingLastName":
        if (shppingAdress && !value) error = "Last name is required"
        break
      case "shippingStreetAddress":
        if (shppingAdress && !value) error = "Street address is required"
        break
      case "shippingPhone":
        if (shppingAdress && !/^\d{10,15}$/.test(value)) error = "Phone number is invalid"
        break
      case "shippingEmailAddress":
        if (shppingAdress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Email address is invalid"
        break
      default:
        break
    }

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      if (error) {
        newErrors[field] = error
      } else {
        delete newErrors[field]
      }
      return newErrors
    })
  }
  ///////
  const validateAllFields = () => {
    Object.keys(formData).forEach(field => validateField(field, formData[field]))
  }
  ///added la

  const handleBlur = event => {
    const { name, value } = event.target
    validateField(name, value)
  }

  const handleFocus = event => {
    const { name } = event.target
    setErrors({
      ...errors,
      [name]: ""
    })
  }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleformupdate = () => {
    validateAllFields()
    setIsSubmitting(true)
  }
  useEffect(() => {
    if (isSubmitting) {
      const isValid = Object.keys(errors).length === 0

      if (isValid) {
        console.log("valid")
        dispatch(addressActions.updateform(formData))
        navigate("/cart/checkout")
      } else {
        throw json({ message: "failed to save address" }, { status: 500 })
      }

      setIsSubmitting(false)
    }
  }, [errors, isSubmitting, dispatch, formData, navigate])

  const countryOptions = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name
  }))

  const billingStateOptions = formData.billingCountry
    ? State.getStatesOfCountry(formData.billingCountry.value).map(state => ({
        value: state.isoCode,
        label: state.name
      }))
    : []

  const shippingStateOptions = formData.shippingCountry
    ? State.getStatesOfCountry(formData.shippingCountry.value).map(state => ({
        value: state.isoCode,
        label: state.name
      }))
    : []

  return (
    <div>
      <div className={classes.billing}>
        <h1>Billing Details</h1>
        <div className={classes.billingName}>
          <TextField className={classes.names} required id="outlined-required" label="First Name" name="billingFirstName" type="text" value={formData.billingFirstName} onChange={e => handleChange("billingFirstName", e.target.value)} onBlur={handleBlur} error={!!errors.billingFirstName} helperText={errors.billingFirstName} onFocus={handleFocus} />
          <TextField className={classes.names} required id="outlined-required" label="Last Name" name="billingLastName" type="text" value={formData.billingLastName} onChange={e => handleChange("billingLastName", e.target.value)} onBlur={handleBlur} error={!!errors.billingLastName} helperText={errors.billingLastName} onFocus={handleFocus} />
        </div>
        <TextField required id="outlined-required" label="Phone" name="billingPhone" type="text" value={formData.billingPhone} onChange={e => handleChange("billingPhone", e.target.value)} onBlur={handleBlur} error={!!errors.billingPhone} helperText={errors.billingPhone} onFocus={handleFocus} />
        <TextField required id="outlined-required" label="Email" name="billingEmailAddress" type="text" value={formData.billingEmailAddress} onChange={e => handleChange("billingEmailAddress", e.target.value)} onBlur={handleBlur} error={!!errors.billingEmailAddress} helperText={errors.billingEmailAddress} onFocus={handleFocus} />
        <TextField fullWidth id="outlined-required" name="billingCompanyName" label="Company Name" value={formData.billingCompanyName} onChange={e => handleChange("billingCompanyName", e.target.value)} onBlur={handleBlur} error={!!errors.billingCompanyName} helperText={errors.billingCompanyName} onFocus={handleFocus} />
        <TextField fullWidth required id="outlined-required" label="Street Address" name="billingStreetAddress" type="text" value={formData.billingStreetAddress} onChange={e => handleChange("billingStreetAddress", e.target.value)} onBlur={handleBlur} error={!!errors.billingStreetAddress} helperText={errors.billingStreetAddress} onFocus={handleFocus} />
        <Select required options={countryOptions} value={formData.billingCountry} onChange={selected => handleChange("billingCountry", selected)} placeholder="Select Country" onBlur={() => validateField("billingCountry", formData.billingCountry)} error={!!errors.billingCountry} helperText={errors.billingCountry} />
        <Select options={billingStateOptions} value={formData.billingState} onChange={selected => handleChange("billingState", selected)} placeholder="Select State" onBlur={() => validateField("billingState", formData.billingState)} />
      </div>
      <div className={classes.diffAddress}>
        <p>Use diffrenet shipping address</p>
        <Checkbox onChange={() => setShippingAdress(!shppingAdress)} />
      </div>
      {shppingAdress && (
        <div className={classes.billing}>
          <h1>Shipping Details</h1>
          <div className={classes.billingName}>
            <TextField sx={{ width: "48%" }} required id="outlined-required" label="First Name" name="shippingFirstName" type="text" value={formData.shippingFirstName} onChange={e => handleChange("shippingFirstName", e.target.value)} onBlur={handleBlur} error={!!errors.shippingFirstName} helperText={errors.shippingFirstName} onFocus={handleFocus} />
            <TextField sx={{ width: "48%" }} required id="outlined-required" label="Last Name" name="shippingLastName" type="text" value={formData.shippingLastName} onChange={e => handleChange("shippingLastName", e.target.value)} onBlur={handleBlur} error={!!errors.shippingLastName} helperText={errors.shippingLastName} onFocus={handleFocus} />
          </div>
          <TextField required id="outlined-required" label="Phone" name="shippingPhone" type="text" value={formData.shippingPhone} onChange={e => handleChange("shippingPhone", e.target.value)} onBlur={handleBlur} error={!!errors.shippingPhone} helperText={errors.shippingPhone} onFocus={handleFocus} />
          <TextField required id="outlined-required" label="Email" name="shippingEmailAddress" type="text" value={formData.shippingEmailAddress} onChange={e => handleChange("shippingEmailAddress", e.target.value)} onBlur={handleBlur} error={!!errors.shippingEmailAddress} helperText={errors.shippingEmailAddress} onFocus={handleFocus} />
          <TextField fullWidth id="outlined-required" name="shippingCompanyName" label="Company Name" value={formData.shippingCompanyName} onChange={e => handleChange("shippingCompanyName", e.target.value)} onBlur={handleBlur} error={!!errors.shippingCompanyName} helperText={errors.shippingCompanyName} onFocus={handleFocus} />
          <TextField fullWidth required id="outlined-required" label="Street Address" name="shippingStreetAddress" type="text" value={formData.shippingStreetAddress} onChange={e => handleChange("shippingStreetAddress", e.target.value)} onBlur={handleBlur} error={!!errors.shippingStreetAddress} helperText={errors.shippingStreetAddress} onFocus={handleFocus} />
          <Select required options={countryOptions} value={formData.shippingCountry} onChange={selected => handleChange("shippingCountry", selected)} placeholder="Select Country" onBlur={() => validateField("shippingCountry", formData.shippingCountry)} error={!!errors.shippingCountry} helperText={errors.shippingCountry} />
          <Select options={shippingStateOptions} value={formData.shippingState} onChange={selected => handleChange("shippingState", selected)} placeholder="Select State" onBlur={() => validateField("shippingState", formData.shippingState)} />
        </div>
      )}

      <div className={classes.buttonGroup}>
        <Button onClick={handleDialogeClose} variant="outlined">
          Close
        </Button>
        <Button onClick={handleformupdate} variant="contained">
          Proceed to payment
        </Button>
      </div>
    </div>
  )
}

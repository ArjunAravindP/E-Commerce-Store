import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import Alert from "@mui/material/Alert"
import { useState } from "react"

const defaultTheme = createTheme()

export default function ContactUs() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleChange = event => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleBlur = event => {
    const { name, value } = event.target
    validateField(name, value)
  }

  const handleFocus = event => {
    const { name } = event.target
    setFormErrors({
      ...formErrors,
      [name]: ""
    })
  }

  const validateField = (name, value) => {
    let error = ""
    if (!value && name !== "message") {
      error = `${name} is required`
    } else {
      switch (name) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            error = "Email address is invalid"
          }
          break
        case "phone":
          if (!/^\d{10}$/.test(value)) {
            error = "Phone number is invalid"
          }
          break
        default:
          break
      }
    }
    setFormErrors({
      ...formErrors,
      [name]: error
    })
  }

  const validate = () => {
    const errors = {}
    Object.keys(formValues).forEach(name => {
      const value = formValues[name]
      if (!value && name !== "message") {
        errors[name] = `${name} is required`
      }
    })

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid"
    }
    if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = "Phone number is invalid"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setFormError("")
    if (validate()) {
      try {
        const response = await fetch("http://localhost:8080/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formValues)
        })

        if (response.ok) {
          setFormSubmitted(true)
          setFormValues({
            name: "",
            email: "",
            phone: "",
            message: ""
          })
        } else {
          const result = await response.json()
          setFormError(result.errors ? result.errors.map(err => err.msg).join(", ") : "Failed to send message")
        }
      } catch (error) {
        setFormError("An error occurred while sending your message.")
      }
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://st4.depositphotos.com/1023934/37752/i/450/depositphotos_377527168-stock-photo-interior-design-modern-living-room.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ContactMailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Contact Us
            </Typography>
            {formSubmitted && (
              <Alert sx={{ marginTop: 2 }} severity="success">
                Your message has been sent successfully!
              </Alert>
            )}
            {formError && (
              <Alert sx={{ marginTop: 2 }} severity="error">
                {formError}
              </Alert>
            )}
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit}>
                <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" value={formValues.name} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} error={!!formErrors.name} helperText={formErrors.name} />
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formValues.email} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} error={!!formErrors.email} helperText={formErrors.email} />
                <TextField margin="normal" required fullWidth id="phone" label="Phone Number" name="phone" autoComplete="phone" value={formValues.phone} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} error={!!formErrors.phone} helperText={formErrors.phone} />
                <TextField margin="normal" fullWidth id="message" label="Message" name="message" multiline rows={4} value={formValues.message} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} error={!!formErrors.message} helperText={formErrors.message} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Send Message
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

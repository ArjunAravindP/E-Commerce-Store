import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import { Form, Link, json } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useActionData } from "react-router-dom"
import Alert from "@mui/material/Alert"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { alertActions } from "../../Context/alert-slice"
import { useDispatch } from "react-redux"

const defaultTheme = createTheme()

export default function SignInSide() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const resData = useActionData()
  useEffect(() => {
    if (resData && resData.token) {
      const token = resData.token
      const user = jwtDecode(token)
      const signInResult = signIn({
        auth: {
          token: token,
          type: "Bearer"
        },
        userState: user.userId
      })
      if (signInResult) {
        dispatch(alertActions.success("Logged in successfully"))
        setTimeout(() => {
          dispatch(alertActions.clear())
        }, 3000)
        navigate("/")
      } else {
        dispatch(alertActions.error("Logged failed"))
        setTimeout(() => {
          dispatch(alertActions.clear())
        }, 3000)
        return json({ message: "Login failed" }, { status: 500 })
      }
    }
  }, [resData, signIn, navigate])
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: ""
  })

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: ""
  })

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
    if (!value) {
      error = `${name} is required`
    } else {
      switch (name) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            error = "Email address is invalid"
          }
          break
        case "password":
          if (value.length < 6) {
            error = "Password must be at least 6 characters"
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
    })

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid"
    }
    if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = event => {
    if (!validate()) {
      event.preventDefault()
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>asds</Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {resData && resData.message && (
              <Alert sx={{ marginTop: 2 }} severity="error">
                {resData.message}
              </Alert>
            )}
            <Box sx={{ mt: 1 }}>
              <Form method="POST" onSubmit={handleSubmit}>
                <TextField type="email" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formValues.email} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} error={!!formErrors.email} helperText={formErrors.email} />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={formValues.password} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} error={!!formErrors.password} helperText={formErrors.password} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>

                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link to="/auth/?mode=signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

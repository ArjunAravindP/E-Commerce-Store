import { json, redirect, useSearchParams } from "react-router-dom"
import SignInSide from "../../Components/Authentication/SignIn"
import SignUpSide from "../../Components/Authentication/Signup"

function AuthenticationPage() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get("mode")
  if (mode === "signup") {
    return <SignUpSide />
  } else {
    return <SignInSide />
  }
}

export default AuthenticationPage

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get("mode") || "login"
  const formData = await request.formData()
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "invalid mdoe" }, { status: 422 })
  }
  const authData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  }
  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData)
  })
  if (response.status === 422 || response.status === 401 || response.status === 400) {
    return response
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 })
  }
  if (response) {
    const resData = await response.json()
    if (mode === "login") {
      return resData
    }
    if (mode === "signup") {
      return redirect("/")
    }
  }
}

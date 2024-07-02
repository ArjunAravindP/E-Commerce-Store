import React from "react"
import ReactDOM from "react-dom/client"
import createStore from "react-auth-kit/createStore"
import { Provider } from "react-redux"
import store from "./Context/index.js"

const authStore = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false
})

import App from "./App.jsx"
import "./input.css"
import "./output.css"

import AuthProvider from "react-auth-kit"

const rootElement = document.getElementById("root")
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <AuthProvider store={authStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
)

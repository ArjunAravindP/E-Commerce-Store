// src/components/AlertBox/AlertBox.js

import React from "react"
import Alert from "@mui/material/Alert"
import { useSelector } from "react-redux"
import classes from "./Alert.module.css"

export default function AlertBox() {
  const { message, status } = useSelector(state => state.alert)

  return (
    message && (
      <Alert className={classes.alert} variant="filled" severity={status}>
        <p>{message}</p>
      </Alert>
    )
  )
}

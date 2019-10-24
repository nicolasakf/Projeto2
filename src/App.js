import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./views/Login";
import Logout from "./views/Logout";
import Home from "./views/Home"
import ImageOCR from "./views/ImageOCR"
import ImageOCRHistory from "./views/ImageOCRHistory"
import PdfOCR from "./views/PdfOCR"
import Register from "./views/Register"
import EditUser from "./views/EditUser";
import Barcode from "./views/Barcode";


import "./css/login.css";
function App() {

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Logout />
          <Home />
        </Route>
        <Route path="/app1/history">
          <Logout />
          <ImageOCRHistory />
        </Route>
        <Route path="/app1">
          <Logout />
          <ImageOCR />
        </Route>
        <Route path="/app2">
          <Logout />
          <PdfOCR />
        </Route>
        <Route path="/app3">
          <Logout />
          <Barcode />
        </Route>
        <Route path="/app4">
          <Logout />
          <ImageOCR />
        </Route>
        <Route path="/register">
          <Logout />
          <Register />
        </Route>
        <Route path="/edit">
          <Logout />
          <EditUser />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

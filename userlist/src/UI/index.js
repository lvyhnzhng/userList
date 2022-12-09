import React, { Component } from "react";
import HomePage from "./components/userPage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import EditUser from "./components/editUser";
import AddNewUser from "./components/addNewUser";
import Error from "./components/errorPage";
import { Typography } from "@mui/material";

function App() {
  return (
    <>
      <BrowserRouter>
        <Typography variant="h5">
          <Link to="/list">user page</Link>
        </Typography>
        <Routes>
          <Route path="/list" element={<HomePage />} />
          <Route path="/list/:id" element={<EditUser />} />
          <Route path="/newuser" element={<AddNewUser />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { Component } from "react";
import HomePage from "./components/userPage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddEditUser from "./components/addOrEditUser";
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
          {/* <Route path="/list/:id" element={<EditUser />} /> */}
          <Route path="/list/:id" element={<AddEditUser />} />
          <Route path="/newuser" element={<AddEditUser />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

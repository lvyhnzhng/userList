import React, { useEffect } from "react";
import HomePage from "./components/userPage";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AddEditUser from "./components/addOrEditUser";
import Error from "./components/errorPage";
import Loggin from "./components/loginPage";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
const RequireAuth = ({ children }) => {
  const nav = useNavigate();
  const isloggedin = useSelector((state) => state.userlist.isloggedin);
  useEffect(() => {
    if (!isloggedin) {
      nav("/login");
    }
  }, []);
  return isloggedin && children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Typography variant="h5">
          <Link to="/list">user page</Link>
        </Typography> */}
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Loggin />} />
          <Route
            path="/list"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/list/:id"
            element={
              <RequireAuth>
                <AddEditUser />
              </RequireAuth>
            }
          />
          <Route
            path="/newuser"
            element={
              <RequireAuth>
                <AddEditUser />
              </RequireAuth>
            }
          />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

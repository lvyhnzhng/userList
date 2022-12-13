import React, { useState } from "react";
import { logginThunk } from "../../features/userlistSlice";
import {
  TextField,
  Button,
  Box,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const atrributes = [
  { id: "firstname", label: "Firstname" },
  { id: "lastname", label: "Lastname" },
  { id: "password", label: "password", type: "password" },
];

const Loggin = () => {
  const [validLogin, setValidLogin] = useState(true);
  const isloggedin = useSelector((state) => state.userlist.isloggedin);
  const [loginInfo, setLoginInfo] = useState({
    firstname: "",
    lastname: "",
    password: "",
    // firstname: "Mila",
    // lastname: "Quinn",
    // password: "IUWYElkhhj987",
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogin = () => {
    dispatch(logginThunk({ loginInfo, nav })).then(() => {
      if (isloggedin) {
        setValidLogin(true);
      } else {
        setValidLogin(false);
      }
    });
  };
  const handleChange = (e) => {
    const name = e.target.id;
    console.log(e.target.id);
    setLoginInfo((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        margin: "auto",
        padding: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h5">Login Page</Typography>
      <ul style={{ listStyle: "none" }}>
        {atrributes.map((atrri) => {
          const { id, ...atr } = atrri;
          return (
            <li>
              <TextField
                fullWidth
                {...atr}
                id={id}
                value={loginInfo[id]}
                onChange={handleChange}
                margin="normal"
              ></TextField>
            </li>
          );
        })}

        <Button onClick={handleLogin}>Login</Button>
        {validLogin ? null : (
          <FormHelperText error>invalid username and password</FormHelperText>
        )}
      </ul>
    </Box>
  );
};
export default Loggin;

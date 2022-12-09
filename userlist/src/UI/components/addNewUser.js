import React, { useState } from "react";
import { addNewUser } from "../../features/userlistSlice";
import InfoRow from "./userInfoRow";
import { useDispatch, useSelector } from "react-redux";
import { checkValidation, setIsValid } from "../../features/validationSlice";
import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Typography,
  Button,
} from "@mui/material";

const attributes = [
  { name: "firstname", title: "First Name" },
  { name: "lastname", title: "Last Name" },
  { name: "sex", title: "Sex" },
  { name: "age", title: "Age" },
  { name: "password", title: "Password" },
  { name: "confirmPassword", title: "Confirm Password" },
];
const AddNewUser = () => {
  const [newUserInfo, setNewUserInfo] = useState({
    firstname: "",
    lastname: "",
    sex: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const errorMessages = useSelector((state) => state.validation.errorMessages);
  const isAllValidate = useSelector((state) => state.validation.isValid);

  const handleChange = (name, tex) => {
    setNewUserInfo({ ...newUserInfo, [name]: tex });
  };
  const handleAddNewUser = (e) => {
    e.preventDefault();
    dispatch(addNewUser(newUserInfo));
    console.log(newUserInfo);
    alert(
      `new user ${newUserInfo.firstname} ${newUserInfo.lastname} has been added successfully!`
    );
    setNewUserInfo({
      firstname: "",
      lastname: "",
      sex: "",
      age: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <FormControl>
          <Box sx={{ width: 500, marginLeft: 20 }}>
            <Typography variant="h4">Add New User</Typography>
          </Box>
          <ul style={{ listStyleType: "none" }}>
            {attributes.map((attribute) => {
              let { name, ...attri } = attribute;
              return (
                <li key={name}>
                  <InfoRow
                    {...attri}
                    name={name}
                    tex={newUserInfo[name]}
                    onChange={handleChange}
                    password={newUserInfo.password}
                    errorMessages={errorMessages[name]}
                  />
                </li>
              );
            })}
          </ul>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginLeft: 30,
            }}
          >
            <Button
              color="primary"
              type="submit"
              disabled={
                Object.values(isAllValidate).filter(
                  (isValid) => isValid !== true
                ).length > 0
              }
              onClick={handleAddNewUser}
            >
              submit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </>
  );
};
export default AddNewUser;

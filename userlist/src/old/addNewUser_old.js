import React, { useState } from "react";
import { addNewUser } from "../../features/userlistSlice";
import InfoRow from "../components/userInfoRow";
import ErrorMessages from "../components/userInfoError";
import Error from "../components/errorPage";
import { requirements } from "../components/validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState({
    firstname: [],
    lastname: [],
    age: [],
    sex: [],
    password: [],
    confirmPassword: [],
  });
  const [isValid, setIsValid] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const errorPage = useSelector((state) => state.userlist.error);
  if (errorPage) {
    return <Error />;
  }
  const handleValidate = (
    name,
    str,
    str2 = newUserInfo.password,
    minNum = 3
  ) => {
    //reset error and isValid
    setError((prevState) => ({ ...prevState, [name]: [] }));
    const idx = attributes.findIndex((attri) => attri.name === name);
    const resetIsValid = [...isValid];
    resetIsValid[idx] = false;
    setIsValid(resetIsValid);
    //refresh error message
    const requireError = requirements.isRequired(name, str);
    const noDigitError = requirements.noDigit(name, str);
    const isMinLenthError = requirements.isMinLenth(name, str, (minNum = 2));
    const isSexError = requirements.isSex(name, str);
    const isAgeError = requirements.isAge(name, str);
    const validPasswordError = requirements.validPassword(name, str);
    const isSameError = requirements.isSame(name, str, str2);
    const curErr = [];
    if (requireError) {
      curErr.push(requireError);
    }
    switch (name) {
      case "firstname":
        if (noDigitError) {
          curErr.push(noDigitError);
        }
        if (isMinLenthError) {
          curErr.push(isMinLenthError);
        }
        break;
      case "lastname":
        if (noDigitError) {
          curErr.push(noDigitError);
        }
        if (isMinLenthError) {
          curErr.push(isMinLenthError);
        }
        break;
      case "sex":
        if (isSexError) {
          curErr.push(isSexError);
        }
        break;
      case "age":
        if (isAgeError) {
          curErr.push(isAgeError);
        }
        break;
      case "password":
        if (validPasswordError) {
          curErr.push(validPasswordError);
        }
        break;
      case "confirmPassword":
        if (isSameError) {
          curErr.push(isSameError);
        }
        break;
    }
    //update error and isValid
    setError((prevState) => ({ ...prevState, [name]: [...curErr] }));
    if (curErr.length === 0) {
      resetIsValid[idx] = true;
    }
    setIsValid(resetIsValid);
  };
  const handleChange = (name, tex) => {
    setNewUserInfo({ ...newUserInfo, [name]: tex });
  };
  const handleAddNewUser = (e) => {
    e.preventDefault();
    dispatch(addNewUser({ newUserInfo, nav }));
    console.log(newUserInfo);

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
                    onValidate={handleValidate}
                    password={newUserInfo.password}
                    confirmPassword={newUserInfo.confirmPassword}
                    errorMessages={error[name]}
                  />
                  <ErrorMessages errorMessages={error[name]} />
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
                isValid.filter((isValid) => isValid !== true).length > 0
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

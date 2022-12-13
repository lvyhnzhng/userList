import React, { useEffect, useState } from "react";
import { addNewUser, updateEditedUser } from "../../features/userlistSlice";
import { setCurPageAndIdx } from "../../features/paginationSlice";
import InfoRow from "./userInfoRow";
import ErrorMessages from "./userInfoError";
import Error from "./errorPage";
import { requirements } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

const AddEditUser = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const params = useParams();
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const pageNumbers = useSelector((state) => state.pagination.pageNumbers);

  const userToEdit = usersToShow.filter((user) => user._id === params.id);
  const errorPage = useSelector((state) => state.userlist.error);
  let userInfo = {
    firstname: "",
    lastname: "",
    sex: "",
    age: "",
    password: "",
    confirmPassword: "",
  };
  let validArray = [false, false, false, false, false, false];
  if (userToEdit[0]) {
    const { firstname, lastname, sex, age, password } = userToEdit[0];
    userInfo = {
      firstname: firstname,
      lastname: lastname,
      sex: sex,
      age: age,
      password: password,
      confirmPassword: password,
    };
    validArray = [true, true, true, true, true, true];
  }
  const [newUserInfo, setNewUserInfo] = useState(userInfo);

  const [error, setError] = useState({
    firstname: [],
    lastname: [],
    age: [],
    sex: [],
    password: [],
    confirmPassword: [],
  });
  const [isValid, setIsValid] = useState(validArray);

  if (errorPage) {
    return <Error />;
  }
  const handleValidate = (name, str, str2 = newUserInfo.password, minNum) => {
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
    console.log(pageNumbers[pageNumbers.length - 1]);
  };
  const handleUploadUser = (e) => {
    e.preventDefault(); //
    newUserInfo._id = params.id;
    console.log(newUserInfo);
    dispatch(updateEditedUser({ newUserInfo, nav }));
    //after the promise fulfilled, navigate to userlist
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
          <Box sx={{ width: 500, marginLeft: 25 }}>
            {params.id ? (
              <Typography variant="h4">Edit User</Typography>
            ) : (
              <Typography variant="h4">Add New User</Typography>
            )}
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
              marginLeft: 25,
            }}
          >
            {params.id ? (
              <>
                <Button
                  color="primary"
                  disabled={
                    isValid.filter((isValid) => isValid !== true).length > 0
                  }
                  onClick={handleUploadUser}
                >
                  update user
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  disabled={
                    isValid.filter((isValid) => isValid !== true).length > 0
                  }
                  onClick={handleAddNewUser}
                >
                  add new user
                </Button>
              </>
            )}
          </Box>
        </FormControl>
      </Box>
    </>
  );
};
export default AddEditUser;

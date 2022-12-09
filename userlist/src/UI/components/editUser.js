import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEditedUser } from "../../features/userlistSlice";
import InfoRow from "./userInfoRow";
import { useParams, useNavigate } from "react-router-dom";
import { checkValidation, setIsValid } from "../../features/validationSlice";
import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Typography,
} from "@mui/material";

const attributes = [
  { name: "firstname", title: "First Name" },
  { name: "lastname", title: "Last Name" },
  { name: "sex", title: "Sex" },
  { name: "age", title: "Age" },
  { name: "password", title: "Password" },
  { name: "confirmPassword", title: "Confirm Password" },
];

const EditPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.userlist.users);
  const user = allUsers.filter((user) => user._id === params.id);
  const { firstname, lastname, sex, age, password, _id } = user[0];
  const [userInfo, setUserInfo] = useState({
    firstname: firstname,
    lastname: lastname,
    age: age,
    sex: sex,
    password: password,
    confirmPassword: "",
    _id: _id,
  });
  const dispatch = useDispatch();
  const errorMessages = useSelector((state) => state.validation.errorMessages);
  const isAllValidate = useSelector((state) => state.validation.isValid);

  const handleChange = (name, tex) => {
    setUserInfo({ ...userInfo, [name]: tex });
  };
  const handleUploadUser = (e) => {
    e.preventDefault(); //
    dispatch(updateEditedUser(userInfo)).then(() => {
      // alert(
      //   `user ${userInfo.firstname} ${userInfo.firstname}'s infomation has been updated successfully!`
      // );
      navigate("/list"); //after the promise fulfilled, navigate to userlist
    });
  };
  console.log(userInfo);
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <FormControl>
        <Box sx={{ width: 500, marginLeft: 25 }}>
          <Typography variant="h4">Edit User</Typography>
        </Box>
        <ul style={{ listStyleType: "none" }}>
          {attributes.map((attribute) => {
            const { name, ...attri } = attribute;
            return (
              <li key={name}>
                <InfoRow
                  {...attri}
                  name={name}
                  tex={userInfo[name]}
                  value={userInfo[name]}
                  onChange={handleChange}
                  password={userInfo.password}
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
            variant="contained"
            onClick={handleUploadUser}
            disabled={
              Object.values(isAllValidate).filter((isValid) => isValid !== true)
                .length > 0 && userInfo.confirmPassword !== userInfo.password
            }
          >
            SUPMIT
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};
export default EditPage;

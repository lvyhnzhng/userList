import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkValidation, setIsValid } from "../../features/validationSlice";
import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";

const InfoRow = ({
  name,
  tex,
  onChange,
  password,
  errorMessages,
  title,
  ...attri
}) => {
  const [hasBlur, setHasBlur] = useState(false);
  const dispatch = useDispatch();
  const setChange = (e) => {
    const updateTex = e.target.value;
    onChange(name, updateTex);
    if (name === "confirmPassword") {
      dispatch(checkValidation({ name, updateTex, password }));
      dispatch(setIsValid(name));
    } else {
      if (hasBlur) {
        dispatch(checkValidation({ name, updateTex }));
        dispatch(setIsValid(name));
      }
    }
  };

  const handleIsBlur = (e) => {
    const updateTex = e.target.value;
    setHasBlur(true);
    if (name === "confirmPassword") {
      dispatch(checkValidation({ name, updateTex, password }));
      dispatch(setIsValid(name));
    } else {
      dispatch(checkValidation({ name, updateTex }));
      dispatch(setIsValid(name));
    }
  };
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField
        error={errorMessages.length > 0}
        fullWidth
        size="small"
        margin="normal"
        value={tex}
        label={title}
        onBlur={handleIsBlur}
        onChange={setChange}
      ></TextField>
      {errorMessages.map((error) => (
        <FormHelperText style={{ color: "red" }} key={error}>
          {error}
        </FormHelperText>
      ))}
    </Box>
  );
};

export default InfoRow;

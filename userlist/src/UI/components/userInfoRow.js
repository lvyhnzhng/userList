import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  confirmPassword,
  errorMessages,
  title,
  onValidate,
  ...attri
}) => {
  let hasFilled = tex.toString() !== "";
  const [isActive, setIsActive] = useState(hasFilled);
  console.log(name, isActive);
  const setChange = (e) => {
    const updateTex = e.target.value;
    onChange(name, updateTex);
    if (isActive) {
      onValidate(name, updateTex);
      if (name === "password" && confirmPassword !== "") {
        onValidate("confirmPassword", confirmPassword, updateTex);
      }
    }
  };
  const handleIsBlur = (e) => {
    const updateTex = e.target.value;
    setIsActive(true);
    if (name !== "confirmPassword") {
      onValidate(name, updateTex);
    }
  };
  const handleFocus = (e) => {
    if (name === "confirmPassword") {
      setIsActive(true);
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
        {...attri}
        error={errorMessages.length > 0}
        fullWidth
        size="small"
        margin="normal"
        value={tex}
        label={title}
        onFocus={handleFocus}
        onBlur={handleIsBlur}
        onChange={setChange}
      ></TextField>
      {/* {errorMessages.map((error) => (
        <FormHelperText style={{ color: "red" }} key={error}>
          {error}
        </FormHelperText>
      ))} */}
    </Box>
  );
};

export default InfoRow;

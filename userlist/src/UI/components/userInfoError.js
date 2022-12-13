import React from "react";
import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";

const ErrorMessages = ({ errorMessages }) => {
  return (
    <>
      {errorMessages.map((error) => (
        <FormHelperText style={{ color: "red" }} key={error}>
          {error}
        </FormHelperText>
      ))}
    </>
  );
};
export default ErrorMessages;

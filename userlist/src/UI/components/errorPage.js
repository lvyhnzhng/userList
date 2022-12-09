import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, backToDefault } from "../../features/userlistSlice";
import { Box, Typography } from "@mui/material";

const Error = (props) => {
  const error = useSelector((state) => state.userlist.error);
  return (
    <>
      <Typography variant="h6">Sorry. Loading was failed.</Typography>
      {error ? (
        <Typography variant="h6">{error} was happened.</Typography>
      ) : null}
    </>
  );
};
export default Error;

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../features/userlistSlice";
import { TextField, Box } from "@mui/material";

const SearchingBar = ({ initializeCurPage }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    initializeCurPage();
    setSearch(e.target.value);
    const searchStr = e.target.value;
    dispatch(searchData(searchStr));
  };
  return (
    <>
      <TextField
        label="Search..."
        margin="normal"
        size="small"
        variant="filled"
        value={search}
        onChange={handleSearch}
      ></TextField>
    </>
  );
};
export default SearchingBar;

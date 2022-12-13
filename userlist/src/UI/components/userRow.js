import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/userlistSlice";
import {
  setCurPageAndIdx,
  setPageNumArr,
} from "../../features/paginationSlice";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const pageNumbers = useSelector((state) => state.pagination.pageNumbers);
  const totalUsers = usersToShow.length;

  const handleDelete = () => {
    // console.log(user._id);
    dispatch(deleteUser(user._id));
  };

  return (
    <>
      <TableRow key={user._id}>
        <TableCell>{user.firstname}</TableCell>
        <TableCell>{user.lastname}</TableCell>
        <TableCell align="center">{user.age}</TableCell>
        <TableCell align="center">{user.sex}</TableCell>
        <TableCell align="center">
          <button>
            <Link to={user._id}>edit</Link>
          </button>
        </TableCell>
        <TableCell align="center">
          <button onClick={handleDelete}>delete</button>
        </TableCell>
      </TableRow>
    </>
  );
};
export default User;

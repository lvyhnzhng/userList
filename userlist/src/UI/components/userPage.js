import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Userlist from "./userList";
import SearchingBar from "./searchingBar";
import Pagination from "./pagination";
import { getAllUsers, backToDefault } from "../../features/userlistSlice";
import { setPageNumArr } from "../../features/paginationSlice";
import {
  Box,
  TableBody,
  Table,
  Tooltip,
  TableContainer,
  Paper,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

function HomePage() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const error = useSelector((state) => state.userlist.error);
  const isPending = useSelector((state) => state.userlist.isPending);
  //------------handle rows to display in current page----------
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const curPage = useSelector((state) => state.pagination.curPage);
  const curPageIdx = useSelector((state) => state.pagination.curPageIdx);
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  //------------------get all users------------------
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  // useEffect(() => {
  //   console.log("totalusers useEffect");
  //   dispatch(setPageNumArr(usersToShow.length));
  // }, [itemsPerPage, usersToShow]);
  //---------------error handling---------------------
  // if (isPending) {
  //   return <Typography variant="h5">loading...</Typography>;
  // }
  if (error) {
    nav("/error");
  }

  const firstItemIdx = curPageIdx * itemsPerPage;
  const lastItemIdx = firstItemIdx + itemsPerPage;
  const usersToShowCurPage = usersToShow.slice(firstItemIdx, lastItemIdx);

  const handleBacktoDefault = () => {
    dispatch(backToDefault());
  };
  console.log(firstItemIdx, lastItemIdx);
  return (
    <>
      <Typography variant="h4" textAlign="center">
        USERLIST PAGE
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Box sx={{ float: "right", marginRight: 5 }}>
          <SearchingBar />
        </Box>
        <Toolbar
          sx={{
            width: 200,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography>default order</Typography>
          <Tooltip>
            <IconButton onClick={handleBacktoDefault}>
              <UndoIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>

        <Table>
          <Userlist usersToShow={usersToShowCurPage} />
          <Pagination />
        </Table>
      </TableContainer>
    </>
  );
}

export default HomePage;

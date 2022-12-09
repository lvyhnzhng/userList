import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Userlist from "./userList";
import SearchingBar from "./searchingBar";
import Pagination from "./pagination";
import { getAllUsers, backToDefault } from "../../features/userlistSlice";
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
  const [itemsPerPage, setItemPerPage] = useState(10);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const error = useSelector((state) => state.userlist.error);
  const isPending = useSelector((state) => state.userlist.isPending);
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const [curUsers, setCurUsers] = useState(usersToShow.slice(0, itemsPerPage));
  //curUsers are the users showing in the curPage
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    console.log("users change");
    handleCurPageRows(); //
  }, [usersToShow, curPage, itemsPerPage]);
  // here is important! to update users immediatelay when data change

  if (isPending) {
    return <Typography variant="h5">loading...</Typography>;
  }
  if (error) {
    nav("/error");
  }

  const handleCurPageRows = (pageNum) => {
    let lastItemIdx = itemsPerPage * curPage;
    let firstItemIdx = lastItemIdx - itemsPerPage;
    if (pageNum) {
      lastItemIdx = itemsPerPage * pageNum;
      firstItemIdx = lastItemIdx - itemsPerPage;
      const curPageUsers = usersToShow.slice(firstItemIdx, lastItemIdx);
      setCurPage(pageNum);
      setCurUsers(curPageUsers);
    } else {
      setCurUsers(usersToShow.slice(firstItemIdx, lastItemIdx));
    }
  };
  const handleInitialPage = () => {
    setCurPage(1);
  };
  const handleItemsPerPage = (num) => {
    if (curPage > Math.ceil(usersToShow.length / num)) {
      setCurPage(Math.ceil(usersToShow.length / num));
    }
    setItemPerPage(num);
  };
  const handleBacktoDefault = () => {
    dispatch(backToDefault());
  };
  //   console.log(curUsers);
  return (
    <>
      <Typography variant="h4" textAlign="center">
        USERLIST PAGE
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Box sx={{ float: "right", marginRight: 5 }}>
          <SearchingBar initializeCurPage={handleInitialPage} />
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
          <Userlist usersToShow={curUsers} />
          <Pagination
            curPage={curPage}
            onCurPage={handleCurPageRows}
            itemsPerPage={itemsPerPage}
            onItemsPerPage={handleItemsPerPage}
          />
        </Table>
      </TableContainer>
    </>
  );
}

export default HomePage;

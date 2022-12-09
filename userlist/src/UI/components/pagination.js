import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableFooter,
  TablePagination,
  IconButton,
  Button,
  Box,
  TableRow,
  TableCell,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const Pagination = ({ curPage, onCurPage, itemsPerPage }) => {
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usersToShow.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const pageIdxUpdate = () => {
    let idx = 0;
    pageNumbers.forEach((num, i) => {
      if (num === curPage) {
        console.log(`current page=${+curPage}, current pageNum idx = ${i}`);
        idx = i;
      }
    });
    return idx;
  };
  const setCurPage = (e) => {
    const name = e.target.getAttribute("name");
    console.log(name);
    if (name === "next") {
      let idx = pageIdxUpdate();
      //   console.log(`curt pageNum idx ${idx}`);
      if (idx < Math.ceil(usersToShow.length / itemsPerPage)) {
        idx++;
        onCurPage(pageNumbers[idx]);
      }
    } else if (name === "previous") {
      let idx = pageIdxUpdate();
      if (idx > 0) {
        idx--;
        onCurPage(pageNumbers[idx]);
      }
    } else if (name === "last") {
      onCurPage(pageNumbers[pageNumbers.length - 1]);
    } else if (name === "first") {
      onCurPage(pageNumbers[0]);
    } else {
      onCurPage(+e.target.getAttribute("name"));
    }
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 1.5 }}>
      <IconButton onClick={setCurPage} name="first" disabled={curPage === 1}>
        <FirstPageIcon name="first" />
      </IconButton>
      <IconButton onClick={setCurPage} name="previous" disabled={curPage === 1}>
        <KeyboardArrowLeft name="previous" />
      </IconButton>
      {pageNumbers.map((curPage) => (
        <IconButton onClick={setCurPage} key={curPage} name={curPage}>
          {curPage}
        </IconButton>
      ))}
      <IconButton
        onClick={setCurPage}
        name="next"
        disabled={curPage === pageNumbers[pageNumbers.length - 1]}
      >
        <KeyboardArrowRight name="next" />
      </IconButton>
      <IconButton
        onClick={setCurPage}
        name="last"
        disabled={curPage === pageNumbers[pageNumbers.length - 1]}
      >
        <LastPageIcon name="last" />
      </IconButton>
    </Box>
  );
};

const PaginationFooter = (props) => {
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const setOnRowsPerPageChange = (e) => {
    props.onItemsPerPage(parseInt(e.target.value));
  };
  return (
    <TableFooter>
      <TableRow>
        <TableCell>
          <Button>
            <Link to="/newuser">Add new user</Link>
          </Button>
        </TableCell>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          rowsPerPage={props.itemsPerPage}
          onRowsPerPageChange={setOnRowsPerPageChange}
          page={props.curPage - 1}
          onPageChange={props.onCurPage}
          count={usersToShow.length}
          ActionsComponent={() => Pagination(props)}
        ></TablePagination>
      </TableRow>
    </TableFooter>
  );
};

export default PaginationFooter;

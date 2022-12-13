import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setPageNumArr,
  changeItemsPerPage,
  setCurPageAndIdx,
} from "../../features/paginationSlice";
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

const Pagination = (props) => {
  const curPage = useSelector((state) => state.pagination.curPage);
  const curPageIdx = useSelector((state) => state.pagination.curPageIdx);
  const pageNumbers = useSelector((state) => state.pagination.pageNumbers);

  const setCurPage = (e) => {
    const id = e.target.id;
    switch (id) {
      case "first":
        props.onPageChange(pageNumbers[0]);
        break;
      case "previous":
        props.onPageChange(pageNumbers[curPageIdx - 1]);
        break;
      case "next":
        props.onPageChange(pageNumbers[curPageIdx + 1]);
        break;
      case "last":
        props.onPageChange(pageNumbers[pageNumbers.length]);
        break;
      default:
        const pageToSet = +e.target.getAttribute("name");
        props.onPageChange(pageToSet);
        break;
    }
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 1.5 }}>
      <IconButton
        onClick={setCurPage}
        id="first"
        disabled={curPage === pageNumbers[0]}
      >
        <FirstPageIcon id="first" />
      </IconButton>
      <IconButton
        onClick={setCurPage}
        id="previous"
        disabled={curPage === pageNumbers[0]}
      >
        <KeyboardArrowLeft id="previous" />
      </IconButton>
      {pageNumbers.map((page) => (
        <IconButton
          key={page}
          id="number"
          name={page}
          onClick={setCurPage}
          disabled={curPage === page}
        >
          {page}
        </IconButton>
      ))}
      <IconButton
        onClick={setCurPage}
        id="next"
        disabled={curPage === pageNumbers[pageNumbers.length - 1]}
      >
        <KeyboardArrowRight id="next" />
      </IconButton>
      <IconButton
        onClick={setCurPage}
        id="last"
        disabled={curPage === pageNumbers[pageNumbers.length - 1]}
      >
        <LastPageIcon id="last" />
      </IconButton>
    </Box>
  );
};

const PaginationFooter = (props) => {
  const dispatch = useDispatch();
  const usersToShow = useSelector((state) => state.userlist.usersToShow);
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const pageNumbers = useSelector((state) => state.pagination.pageNumbers);
  const curPageIdx = useSelector((state) => state.pagination.curPageIdx);
  const curPage = useSelector((state) => state.pagination.curPage);

  //-----------keep user rows displaying in current page valid-----------
  useEffect(() => {
    const totalUsers = usersToShow.length;
    dispatch(setPageNumArr(totalUsers));
  }, [usersToShow]);
  useEffect(() => {
    if (curPageIdx > pageNumbers.length - 1 && pageNumbers.length >= 1) {
      dispatch(setCurPageAndIdx(pageNumbers[pageNumbers.length - 1]));
    }
  }, [pageNumbers]);
  if (curPageIdx < 0) {
    dispatch(setCurPageAndIdx(1));
  }

  const setOnRowsPerPageChange = (e) => {
    dispatch(changeItemsPerPage(e.target.value));
  };
  const handlePageChange = (num) => {
    dispatch(setCurPageAndIdx(num));
    console.log("handlePageChange");
  };
  console.log(curPageIdx, curPage);
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
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={setOnRowsPerPageChange}
          page={curPageIdx}
          onPageChange={handlePageChange}
          count={usersToShow.length}
          ActionsComponent={Pagination}
        ></TablePagination>
      </TableRow>
    </TableFooter>
  );
};

export default PaginationFooter;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    totalUsers: 0,
    pageNumbers: [],
    curPageIdx: 0,
    curPage: 1,
    itemsPerPage: 10,
    firstItemIdx: 0,
    lastItemIdx: 10,
  },
  reducers: {
    setPageNumArr: (state, actions) => {
      state.totalUsers = actions.payload;
      const pageNumsArr = [];
      for (
        let i = 1;
        i <= Math.ceil(state.totalUsers / state.itemsPerPage);
        i++
      ) {
        pageNumsArr.push(i);
      }
      state.pageNumbers = [...pageNumsArr];
      console.log(state.pageNumbers);
    },
    changeItemsPerPage: (state, actions) => {
      state.itemsPerPage = actions.payload;
      console.log(state.itemsPerPage);
    },
    setCurPageAndIdx: (state, actions) => {
      state.curPage = actions.payload;
      const idx = state.pageNumbers.findIndex((num) => num === state.curPage);
      state.curPageIdx = idx;
      console.log(state.curPage, state.curPageIdx);
    },
    initilizeCurPage: (state, actions) => {
      state.curPage = 1;
      state.curPageIdx = 0;
    },
    navToLastPage: (state, actions) => {
      state.curPage = state.pageNumbers[state.pageNumbers.length - 1];
      state.curPageIdx = state.pageNumbers.length - 1;
    },
  },
});
export default paginationSlice.reducer;
export const {
  setPageNumArr,
  changeItemsPerPage,
  setCurPageAndIdx,
  navToLastPage,
} = paginationSlice.actions;

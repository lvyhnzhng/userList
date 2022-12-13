import { configureStore } from "@reduxjs/toolkit";
import userlistReducer from "../features/userlistSlice";
import paginationReducer from "../features/paginationSlice";

export default configureStore({
  reducer: { userlist: userlistReducer, pagination: paginationReducer },
});

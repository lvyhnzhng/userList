import { configureStore } from "@reduxjs/toolkit";
import userlistReducer from "../features/userlistSlice";
import validationReducer from "../features/validationSlice";

export default configureStore({
  reducer: { userlist: userlistReducer, validation: validationReducer },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { navToLastPage, setPageNumArr } from "./paginationSlice";

//---------------------async thunk---------------
const logginThunk = createAsyncThunk(
  "userlist/loggin",
  async ({ loginInfo, nav }) => {
    const response = await axios.post("http://localhost:8088/login", loginInfo);
    const loginUser = response.data;
    return { loginUser, nav };
  }
);

const getAllUsers = createAsyncThunk("userlist/getAllusers", async () => {
  const response = await axios.get("http://localhost:8088");
  // console.log(response);
  return response.data;
});
const updateEditedUser = createAsyncThunk(
  "userlist/updateEditUser",
  async ({ newUserInfo, nav }) => {
    console.log(newUserInfo);
    const { _id } = newUserInfo;
    await axios.put(`http://localhost:8088/${_id}`, newUserInfo);
    return nav; //the only way to useNavigate hook in redux(not a react component)
  }
);
const addNewUser = createAsyncThunk(
  "userlist/addNewUser",
  async ({ newUserInfo, nav }, { dispatch, getState }) => {
    await axios
      .post(`http://localhost:8088`, { newUserInfo })
      .then(() => dispatch(getAllUsers()))
      .then(() => {
        const totalUsers = getState().userlist.usersToShow.length;
        //getState can get state from other slice!
        dispatch(setPageNumArr(totalUsers));
      })
      .then(() => {
        dispatch(navToLastPage());
      });

    return nav;
  }
);
const deleteUser = createAsyncThunk(
  "userlist/deleteUser",
  async (id, { dispatch }) => {
    await axios.delete(`http://localhost:8088/${id}`);
    await dispatch(getAllUsers()); //call other actions or async thunk
    return id; //this return is useless but to show that you can pass data here
  }
);
export { getAllUsers, updateEditedUser, deleteUser, addNewUser, logginThunk };

const userlistSlice = createSlice({
  name: "userlist",
  initialState: {
    users: [],
    usersToShow: [],
    sortedCol: "",
    error: "",
    isPending: false,
    isloggedin: false,
  },
  //initialState is S S S!!!
  reducers: {
    logout(state, actions) {
      const nav = actions.payload;
      state.isloggedin = false;
      nav("/login");
    },
    searchData(state, actions) {
      if (actions.payload) {
        const searchStr = actions.payload;
        const searchedUsers = [];
        state.users.forEach((user) => {
          if (
            `${user.firstname} ${user.lastname} ${user.age} ${user.sex}`.indexOf(
              searchStr
            ) !== -1
          ) {
            searchedUsers.push(user);
          }
          state.usersToShow = [...searchedUsers];
        });
      } else {
        state.usersToShow = [...state.users];
      }
    },
    sorting(state, actions) {
      const { name, sortMethod } = actions.payload;
      state.sortedCol = name;
      console.log(actions.payload);
      const updateUsersToShow = [...state.usersToShow];
      switch (name) {
        case "age":
          if (sortMethod === "asc") {
            updateUsersToShow.sort((userA, userB) => userA[name] - userB[name]);
          }
          if (sortMethod === "desc") {
            updateUsersToShow.sort((userA, userB) => userB[name] - userA[name]);
          }
          break;
        default:
          const sortAsc = () => {
            updateUsersToShow.sort((userA, userB) => {
              const itemA = userA[name].toUpperCase();
              const itemB = userB[name].toUpperCase();
              if (itemA < itemB) {
                return -1;
              }
              if (itemA > itemB) {
                return 1;
              }
              return 0;
            });
          };
          if (sortMethod === "asc") {
            sortAsc();
          }
          if (sortMethod === "desc") {
            sortAsc();
            updateUsersToShow.reverse();
          }
          break;
      }
      state.usersToShow = [...updateUsersToShow];
    },
    backToDefault(state, actions) {
      state.usersToShow = [...state.users];
      state.sortedCol = "";
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, actions) => {
      state.isPending = true;
      console.log("get all users is pending");
    },
    [getAllUsers.fulfilled]: (state, actions) => {
      state.users = [...actions.payload];
      state.usersToShow = [...actions.payload];
      state.isPending = false;
      state.error = "";
    },
    [getAllUsers.rejected]: (state, actions) => {
      state.error = actions.error.message;
      state.isPending = false;
      console.log(state.error.message);
    },
    [logginThunk.pending]: (state, actions) => {
      state.isPending = false;
    },
    [logginThunk.fulfilled]: (state, actions) => {
      const { loginUser, nav } = actions.payload;
      console.log(loginUser, nav);
      if (loginUser) {
        state.isloggedin = true;
        console.log(state.isloggedin);
        nav("/list");
      } else {
        state.isloggedin = false;
      }
    },
    [updateEditedUser.pending]: (state, actions) => {
      console.log("edit user is pending");
      state.isPending = true;
    },
    [updateEditedUser.fulfilled]: (state, actions) => {
      const nav = actions.payload;
      console.log("edit user fulfilled");
      state.isPending = false;
      state.error = "";
      nav("/list");
    },
    [updateEditedUser.rejected]: (state, actions) => {
      state.error = actions.error.message;
      state.isPending = false;
    },
    // [deleteUser.pending]: (state, actions) => {
    //   console.log("delete user is pending");
    //   state.isPending = true;
    // },
    [deleteUser.fulfilled]: (state, actions) => {
      state.isPending = false;
      console.log("delete user fulfilled");
      state.error = "";
    },
    [deleteUser.rejected]: (state, actions) => {
      state.isPending = false;
      state.error = actions.error.message;
    },
    [addNewUser.pending]: (state, actions) => {
      state.isPending = true;
      console.log("add new user is pending");
    },
    [addNewUser.fulfilled]: (state, actions) => {
      const nav = actions.payload;
      console.log(actions.payload);
      state.isPending = false;
      console.log("add new user fulfilled");
      state.error = "";
      nav("/list");
    },
    [addNewUser.rejected]: (state, actions) => {
      console.log(actions.error.message);
      state.isPending = false;
      state.error = actions.error.message;
    },
  },
});
export default userlistSlice.reducer;
//to export reducer, use "export default ..." syntax, coz we don't know reducer's name
export const { logout, searchData, sorting, backToDefault } =
  userlistSlice.actions;

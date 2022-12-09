import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userlistSlice = createSlice({
  name: "userlist",
  initialState: {
    users: [],
    usersToShow: [],
    sortedCol: "",
    error: "",
    isPending: false,
  },
  //initialState is S S S!!!
  reducers: {
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
  extraReducers(builder) {
    builder.addCase(getAllUsers.pending, (state, actions) => {
      state.isPending = true;
      console.log("get all users is pending");
    });
    builder.addCase(getAllUsers.fulfilled, (state, actions) => {
      state.users = [...actions.payload];
      state.usersToShow = [...actions.payload];
      state.isPending = false;
      state.error = "";
    });
    builder.addCase(getAllUsers.rejected, (state, actions) => {
      state.error = actions.error.message;
      state.isPending = false;
      console.log(state.error.message);
    });
    builder.addCase(updateEditedUser.pending, (state, actions) => {
      console.log("edit user is pending");
      state.isPending = true;
    });
    builder.addCase(updateEditedUser.fulfilled, (state, actions) => {
      console.log("edit user fulfilled");
      state.isPending = false;
      state.error = "";
    });
    builder.addCase(updateEditedUser.rejected, (state, actions) => {
      state.error = actions.error.message;
      state.isPending = false;
    });
    builder.addCase(deleteUser.pending, (state, actions) => {
      console.log("delete user is pending");
      state.isPending = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, actions) => {
      state.isPending = false;
      console.log("delete user fulfilled");
      state.error = "";
    });
    builder.addCase(deleteUser.rejected, (state, actions) => {
      state.isPending = false;
      state.error = actions.error.message;
    });
    builder.addCase(addNewUser.pending, (state, actions) => {
      state.isPending = true;
      console.log("add new user is pending");
    });
    builder.addCase(addNewUser.fulfilled, (state, actions) => {
      state.isPending = false;
      console.log("add new user fulfilled");
      state.error = "";
    });
    builder.addCase(addNewUser.rejected, (state, actions) => {
      console.log(actions.error.message);
      state.isPending = false;
      state.error = actions.error.message;
    });
  },
});

export default userlistSlice.reducer;
//to export reducer, use "export default ..." syntax, coz we don't know reducer's name
export const { searchData, sorting, backToDefault } = userlistSlice.actions;

//---------------------async thunk---------------
const getAllUsers = createAsyncThunk("userlist/getAllusers", async () => {
  const response = await axios.get("http://localhost:8088");
  // console.log(response);
  return response.data;
});
const updateEditedUser = createAsyncThunk(
  "userlist/updateEditUser",
  async (userInfo) => {
    const { firstname, lastname, sex, age, password, _id } = userInfo;
    const response = await axios.put(`http://localhost:8088/${_id}`, {
      userInfo,
    });
    return response.data;
  }
);
const addNewUser = createAsyncThunk(
  "userlist/addNewUser",
  async (newUserInfo) => {
    await axios.post(`http://localhost:8088`, { newUserInfo });
    console.log(newUserInfo);
  }
);
const deleteUser = createAsyncThunk(
  "userlist/deleteUser",
  async (id, { dispatch }) => {
    await axios.delete(`http://localhost:8088/${id}`);
    await dispatch(getAllUsers());
    return id;
  }
);
export { getAllUsers, updateEditedUser, deleteUser, addNewUser };

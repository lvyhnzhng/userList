import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./userRow";
import { sorting } from "../../features/userlistSlice";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

const headCells = [
  { name: "firstname", lable: "First Name", sortable: true },
  { name: "lastname", lable: "Last Name", sortable: true },
  { name: "age", lable: "Age", align: "center", sortable: true },
  { name: "sex", lable: "Sex", align: "center", sortable: true },
  { name: "editUser", lable: "Edit User", align: "center", sortable: false },
  {
    name: "deleteUser",
    lable: "Delete User",
    align: "center",
    sortable: "false",
  },
];

const HeadCol = (props) => {
  const [direction, setDirection] = useState("desc");
  const [colisSorted, setColIsSorted] = useState(false);
  const sortedCol = useSelector((state) => state.userlist.sortedCol);
  const dispatch = useDispatch();
  const handleSort = (name) => {
    setColIsSorted(true);
    const dirs = ["desc", "asc"];
    const sortMethod = dirs.filter((dir) => dir !== direction)[0];
    setDirection(sortMethod);
    dispatch(sorting({ name, sortMethod }));
  };
  const { lable, sortable, name, ...atrri } = props.head;
  return (
    <TableCell {...atrri} name={name}>
      <TableSortLabel
        active={sortable === true && colisSorted === true && name === sortedCol}
        direction={direction}
        onClick={() => handleSort(name)}
        name={name}
      >
        {lable}
      </TableSortLabel>
    </TableCell>
  );
};

const UserList = ({ usersToShow }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          {headCells.map((head) => {
            return <HeadCol head={head} key={head.name} />;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {usersToShow.map((user, idx) => (
          <User key={user._id} user={user} />
        ))}
      </TableBody>
    </>
  );
};
export default UserList;

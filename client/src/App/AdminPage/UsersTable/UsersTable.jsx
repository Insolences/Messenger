import UserData from "./UserData";
import { Notification } from "../../../components/Notifications";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";
import componentStyle from "./UsersTable.module.scss";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import { Paginate } from "../../../components/Paginate/Paginate";
import API from "../../../services/API";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: orange[500],
    position: "absolute",
    right: 0,
    bottom: 0,
  },
}));

export const UsersTable = ({ socket }) => {
  const classes = useStyles();
  const [init, isInit] = useState(true);
  const [error, setError] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [users, setUsers] = useState([]);

  //paginate
  const [offset, setOffset] = useState(0);
  const [sortUser, setSortUser] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  //----------

  useEffect(async () => {
    let allUsers = await getUsersData();
    setUsers(allUsers);
    setPageCount(Math.ceil(allUsers.length / perPage));
  }, []);

  useEffect(() => {
    setSortUser(users.slice(offset, offset + perPage));
  }, [offset, users]);

  const getUsersData = async () => {
    try {
      return await API.getUsersData();
    } catch (e) {
      setError(true);
      setServerMessage(e.body.message);
    }
  };

  const updateUsersData = async () => {
    try {
      const res = await API.sendUsersData(sortUser);
      socket.emit("admin", sortUser);
      setServerMessage(res.body);
      setDisabled(true);
      setError(true);
    } catch (e) {
      setError(true);
      setServerMessage(e.body.message);
    }
  };

  const handlePageClick = async (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
    const allUsers = await getUsersData();
    setUsers(allUsers);
  };

  const handleClose = () => {
    setError(false);
  };

  const handleChange = (e, id) => {
    let changeUsers = sortUser.map((user) => {
      if (user.id === id) {
        switch (e.target.name) {
          case "is_admin":
            return {
              ...user,
              is_admin: !user.is_admin,
            };
          case "is_blocked":
            return {
              ...user,
              is_blocked: !user.is_blocked,
            };
          case "read_only":
            return {
              ...user,
              read_only: !user.read_only,
            };
          case "nickname":
            return {
              ...user,
              nickname: e.target.value,
            };
          case "email":
            return {
              ...user,
              email: e.target.value,
            };
          default:
            break;
        }
      } else {
        return user;
      }
    });
    setSortUser(changeUsers);
    setDisabled(false);
  };

  if (init) {
    return (
      <>
        <div>
          {error && (
            <Notification message={serverMessage} handleClose={handleClose} />
          )}
          <table className={componentStyle.usersTable}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Login</th>
                <th scope="col">Nickname</th>
                <th scope="col">is Admin</th>
                <th scope="col">Read only</th>
                <th scope="col">is Blocked</th>
                <th scope="col" className={classes.email}>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {sortUser.map((user, index) => {
                return (
                  <UserData
                    user={user}
                    index={index}
                    handleChange={handleChange}
                    key={user.id}
                    id={user.id}
                  />
                );
              })}
            </tbody>
          </table>
          {users.length > 10 ? (
            <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
          ) : null}
          <Button
            variant="contained"
            type="submit"
            className={classes.submit}
            disabled={disabled}
            onClick={updateUsersData}
          >
            SAVE
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <ReactLoading type={"bars"} color={"white"} />
        </div>
      </>
    );
  }
};

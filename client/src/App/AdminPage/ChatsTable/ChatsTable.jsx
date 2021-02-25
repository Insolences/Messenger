import React, { useEffect, useState } from "react";
import { Notification } from "../../../components/Notifications";
import componentStyle from "./ChatsTable.module.scss";
import ChatData from "./ChatData";
import { Paginate } from "../../../components/Paginate/Paginate";
import API from "../../../services/API";
import ChatUsersList from "./ChatUsersList";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

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

export const ChatsTable = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [disabled, setDisabled] = useState(true);
  //paginate
  const [offset, setOffset] = useState(0);
  const [sortChats, setSortChat] = useState([]);
  const [sortUsersInGroup, setSortUsersInGroup] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const handleClose = () => {
    setError(false);
  };

  useEffect(async () => {
    let allChats = await getChatsData();
    if (allChats.message) {
      setError(true);
      setServerMessage(allChats.message);
    } else setChats(allChats);
    setPageCount(Math.ceil(allChats.length / perPage));
  }, []);

  useEffect(() => {
    setSortChat(chats.slice(offset, offset + perPage));
  }, [offset, chats]);

  useEffect(() => {
    setSortUsersInGroup(usersInGroup.slice(offset, offset + perPage));
  }, [offset, usersInGroup]);

  const getChatsData = async () => {
    try {
      let res = await API.getChatsData();
      return res;
    } catch (e) {
      setError(true);
      setServerMessage(e.body.message);
    }
  };

  const handleDeleteUser = async (id) => {
    let userToDelete = usersInGroup.find((group) => group.id === id);
    try {
      const res = await API.deleteUserFromChat(
        userToDelete.chat_id,
        userToDelete.id
      );
      setServerMessage(res.message);
      setError(true);
      const newUsersInGroup = usersInGroup.filter(
        (userToDelete) => userToDelete.id !== id
      );
      setUsersInGroup(newUsersInGroup);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageClick = async (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
    const allChats = await getChatsData();
    setChats(allChats);
  };

  const updateChatsData = async () => {
    try {
      const res = await API.sendChatsData(sortChats);
      setServerMessage(res.body);
      setDisabled(true);
      setError(true);
    } catch (e) {
      setError(true);
      setServerMessage(e.body.message);
    }
  };

  const openGroupUsers = async (id) => {
    let groupUsers = await chats.find((group) => group.dataValues.id === id);
    await setUsersInGroup(groupUsers.users);
    setPageCount(Math.ceil(usersInGroup.length / perPage));
  };

  const handleChange = (e, id) => {
    let changeChat = sortChats.map((chat) => {
      if (chat.dataValues.id === id) {
        switch (e.target.name) {
          case "title":
            return {
              ...chat,
              dataValues: {
                ...chat.dataValues,
                title: e.target.value,
              },
            };
          default:
            break;
        }
      } else {
        return chat;
      }
    });
    setSortChat(changeChat);
    setDisabled(false);
  };

  const renderTableOfGroups = () => {
    return (
      <>
        <table className={componentStyle.chatsTable}>
          <thead>
            <tr>
              <th scope="col">Group ID</th>
              <th scope="col">Title</th>
              <th scope="col">Owner id</th>
              <th scope="col">created at</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {sortChats.map((chat, index) => {
              return (
                <ChatData
                  chat={chat.dataValues}
                  index={index}
                  openGroupUsers={openGroupUsers}
                  handleChange={handleChange}
                  key={chat.dataValues.id}
                  id={chat.dataValues.id}
                />
              );
            })}
          </tbody>
        </table>
        <Button
          variant="contained"
          type="submit"
          className={classes.submit}
          disabled={disabled}
          onClick={updateChatsData}
        >
          SAVE
        </Button>
        {chats.length > 10 ? (
          <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
        ) : null}
      </>
    );
  };

  const backToChats = async () => {
    let allChats = await getChatsData();
    setChats(allChats);
    setUsersInGroup([]);
    setPageCount(Math.ceil(allChats.length / perPage));
  };

  const renderUsersInGroup = () => {
    return (
      <>
        <Button
          variant="contained"
          type="primary"
          className={classes.submit}
          onClick={backToChats}
        >
          BACK
        </Button>
        <table className={componentStyle.chatsTable}>
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">NickName</th>
              <th scope="col">email</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sortUsersInGroup.map((user, index) => {
              return (
                <ChatUsersList
                  user={user}
                  index={index}
                  handleDelete={handleDeleteUser}
                  key={user.id_user}
                  id={user.id_user}
                />
              );
            })}
          </tbody>
        </table>
        {usersInGroup.length > 10 ? (
          <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
        ) : null}
      </>
    );
  };

  return (
    <div>
      {error && (
        <Notification message={serverMessage} handleClose={handleClose} />
      )}
      {usersInGroup.length === 0 ? renderTableOfGroups() : renderUsersInGroup()}
    </div>
  );
};

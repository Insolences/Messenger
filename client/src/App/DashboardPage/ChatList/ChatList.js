import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  Badge,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./ChatListStyle";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ChatListItem from "./ChatListItem";

const ChatList = ({
  setMsgShow,
  msgShow,
  chats,
  active,
  setActive,
  setChats,
  leaveGroup,
  deleteChat,
}) => {
  const classes = useStyles();
  if (chats) {
    return (
      <div>
        <Grid container className={classes.row}>
          {chats.map(({ id, title, message, type, newChat, count }, index) => (
            <div key={id} className={classes.body}>
              {type === "public" && (
                <Tooltip title="Выйти из группы" placement="right">
                  <IconButton
                    className={classes.leaveGroup}
                    onClick={() => {
                      setMsgShow(false);
                      leaveGroup(id);
                    }}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              )}
              {type === "private" && (
                <Tooltip title="Удалить чат" placement="right">
                  <IconButton
                    className={classes.deleteChat}
                    onClick={() => {
                      setMsgShow(false);
                      deleteChat(id, chats[index].user_id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              <ChatListItem
                id={id}
                index={index}
                title={title}
                message={message}
                chats={chats}
                setChats={setChats}
                active={active}
                setActive={setActive}
                setMsgShow={setMsgShow}
              />
              {count > 1 && (
                <Badge
                  badgeContent={count}
                  color="primary"
                  className={classes.newMessages}
                >
                  <MailIcon />
                </Badge>
              )}
              {newChat && (
                <Badge
                  badgeContent={0}
                  color="primary"
                  className={classes.newChats}
                >
                  <NotificationsActiveIcon />
                </Badge>
              )}
            </div>
          ))}
        </Grid>
      </div>
    );
  }
};
export default ChatList;

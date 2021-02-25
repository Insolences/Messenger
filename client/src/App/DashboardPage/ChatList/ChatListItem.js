import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { useStyles } from "./ChatListStyle";

const ChatListItem = ({
  id,
  title,
  message,
  chats,
  active,
  setActive,
  index,
  setChats,
  setMsgShow,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        item
        sm={12}
        xs={12}
        className={
          chats[index].id === active ? classes.active : classes.default
        }
        onClick={() => {
          setActive(chats[index].id);

          setChats((previos) => {
            previos[index] = { ...previos[index], message: "", newChat: false };
            return previos;
          });
        }}
      >
        <div className={classes.column} onClick={() => setMsgShow(true)}>
          <Grid container>
            <Grid item sm={4} md={2} xs={2} className={classes.column__img}>
              <Avatar
                className={classes.random}
                style={{
                  backgroundColor: "grey",
                  color: "white",
                }}
              >
                {title.substr(0, 2).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item sm={8} md={10} xs={10} className={classes.column__body}>
              <Typography variant="h4" className={classes.title}>
                {title}
              </Typography>
              <Typography variant="h6" className={classes.message}>
                {message}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};
export default ChatListItem;

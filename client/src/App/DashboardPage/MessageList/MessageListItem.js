import { Grid, Avatar, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./MessageListStyle";

const MessageListItem = ({ id, sender_id, nickname, text, user }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        className={user.id === sender_id ? classes.own : classes.notOwn}
      >
        <Grid item sm={1} md={1} xs={1} className={classes.column__img}>
          <Avatar
            className={classes.random}
            style={{
              backgroundColor: "grey",
              color: "white",
            }}
          >
            {nickname.substr(0, 2).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item sm={4} md={4} xs={4} className={classes.column__body}>
          <Typography className={classes.column__nickname}>
            {nickname}
          </Typography>
          <Typography className={classes.column__text}>{text}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default MessageListItem;

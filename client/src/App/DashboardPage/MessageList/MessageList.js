import {
  Grid,
  IconButton,
  Paper,
  TextareaAutosize,
  Button,
  TextField,
  Tooltip,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { React, useState, useRef, useEffect } from "react";
import MessageListItem from "./MessageListItem";
import { useStyles } from "./MessageListStyle";

const MessageList = ({
  active,
  user,
  messages,
  sendMessage,
  setMsgShow,
  setActive,
}) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const textInput = useRef("");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    scrollToBottom();
  }, [active]);
  const onKeyPress = (event) => {
    if (event.which === 13) {
      onSubmit(event);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (!textInput.current.value) {
      return false;
    }
    // setState({
    //   ...state,
    //   messages: [
    //     ...state.messages,
    //     {
    //       id: state.messages[state.messages.length - 1].id + 1,
    //       chat_id: state.active,
    //       sender_id: user.id,
    //       nickname: user.nickname,
    //       text: text,
    //     },
    //   ],
    // });
    sendMessage({
      chat_id: active,
      sender_id: user.id,
      text: textInput.current.value,
      nickname: user.nickname,
    });
    textInput.current.value = "";
  };
  return (
    <>
      <Grid container className={classes.row}>
        <Grid item sm={12} className={classes.text__area}>
          <Tooltip title="Назад" placement="right">
            <IconButton
              className={classes.arrow}
              onClick={() => {
                setMsgShow(false);
                setActive(null);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Paper className={classes.paper}>
            {messages
              .filter((message) => message.chat_id === active)
              .map(({ id, sender_id, nickname, text }) => (
                <div key={id}>
                  <MessageListItem
                    id={id}
                    sender_id={sender_id}
                    nickname={nickname}
                    text={text}
                    user={user}
                  />
                </div>
              ))}
            <div ref={messagesEndRef} />
          </Paper>
        </Grid>
        <Grid item sm={12} className={classes.button__area}>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              name="text"
              autoFocus
              multiline
              rows={1}
              rowsMax={3}
              inputProps={{ maxLength: 500 }}
              inputRef={textInput}
              onKeyPress={onKeyPress}
              className={classes.input__area}
              disabled={user.read_only}
            />
            <Button onClick={onSubmit} type="submit" disabled={user.read_only}>
              <SendIcon></SendIcon>
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default MessageList;

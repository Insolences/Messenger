import { React, useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Box,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  Popover,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { useStyles } from "./DashboardPageStyle";
import ChatList from "./ChatList/ChatList";
import MessageList from "./MessageList/MessageList";
import CreateGroup from "../../components/CreateGroup/CreateGroup";
import CreateChat from "../../components/CreateChat/CreateChat";
import Profile from "../../components/Profile/Profile";

const DashboardPage = ({ socket }) => {
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    socket.on("getUserInfo", (data) => {
      setUser(data.query);
    });
    socket.on("getChats", (data) => {
      setChats(data);
    });
    socket.on("getMessages", (data) => {
      setMessages(data);
    });
    socket.on("newMessage", (data) => {
      console.log(chats.indexOf(data.chat_id));
      setMessages((prev) => [...prev, data]);
    });
    socket.on("newChat", (data) => {
      setChats((prev) => [...prev, data]);
    });
    socket.on("sendAllUsers", (data) => {
      setAllUsers(data);
      setSavedUsers(data);
    });
    socket.on("bannedUser", () => {
      socket.disconnect();
      localStorage.clear();
      history.push("/auth");
    });
  }, []);

  const [msgShow, setMsgShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openIcons, setOpenIcons] = useState(null);
  const open = Boolean(anchorEl);
  const openIconsShow = Boolean(openIcons);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({
    id: 1,
    is_admin: false,
    read_only: false,
    nickname: "",
    email: "",
    img: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const [createChat, setCreateChat] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const sendMessage = (query) => {
    socket.emit("sendMessage", query);
  };
  const sendChat = (receiverId) => {
    socket.emit("createChat", [user.id, receiverId]);
  };
  const sendGroup = (groupName, users) => {
    socket.emit("createGroup", {
      usersId: [...users, user.id],
      title: groupName,
    });
  };
  const leaveGroup = (group_id) => {
    socket.emit("leaveGroup", { chat_id: group_id, user_id: user.id });
  };
  const deleteChat = (group_id, receiverId) => {
    socket.emit("deleteChat", {
      usersId: [user.id, receiverId],
      chat_id: group_id,
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Dialog open={createChat} className={classes.chat_dialog}>
        <CreateChat
          allUsers={allUsers}
          savedUsers={savedUsers}
          setAllUsers={setAllUsers}
          sendChat={sendChat}
          setCreateChat={setCreateChat}
          setOpenIcons={setOpenIcons}
          setActive={setActive}
          setMsgShow={setMsgShow}
          chats={chats}
          closeFunc={() => setCreateChat(false)}
        />
      </Dialog>
      <Dialog open={createGroup} className={classes.group_dialog}>
        <CreateGroup
          allUsers={allUsers}
          savedUsers={savedUsers}
          setAllUsers={setAllUsers}
          sendGroup={sendGroup}
          setOpenIcons={setOpenIcons}
          setMsgShow={setMsgShow}
          setActive={setActive}
          setCreateGroup={setCreateGroup}
          closeFunc={() => setCreateGroup(false)}
        />
      </Dialog>
      <Dialog open={showProfile} className={classes.profile_dialog}>
        <Profile
          user={user}
          socket={socket}
          closeFunc={() => setShowProfile(false)}
        />
      </Dialog>
      <Box className={classes.wrapper}>
        <AppBar position="static" className={classes.appBarBackground}>
          <Container fixed>
            <Toolbar>
              <Grid container className={classes.row}>
                <Grid item sm={3} xs={6}>
                  <Logo />
                </Grid>
                <Hidden only="xs">
                  <Grid item sm={6} xs={6} className={classes.textCenter}>
                    <Typography variant="h6">Messenger</Typography>
                  </Grid>
                </Hidden>
                <Grid item sm={3} xs={6} className={classes.icon}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setShowProfile(true);
                      }}
                    >
                      Profile
                    </MenuItem>
                    {user.is_admin && (
                      <MenuItem onClick={handleClose}>
                        <Link to="/admin" className={classes.link}>
                          Admin Panel
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        localStorage.clear();
                        history.push("/auth");
                      }}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Box className={classes.body}>
          <Container fixed>
            <Grid container className={classes.row}>
              <Grid
                item
                sm={6}
                md={4}
                xs={12}
                className={
                  msgShow
                    ? classes.chatList +
                      " " +
                      classes.column +
                      " " +
                      classes.scroll +
                      " " +
                      classes.chat__column
                    : classes.column +
                      " " +
                      classes.scroll +
                      " " +
                      classes.chat__column
                }
              >
                {chats.length === 0 && (
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                    className={classes.lookchat}
                  >
                    Нажмите на иконку
                    <ImportContactsIcon className={classes.icontest} /> чтобы
                    создать новый чат{" "}
                    <ArrowDownwardIcon className={classes.icontest} />
                  </Grid>
                )}
                <ChatList
                  setMsgShow={setMsgShow}
                  msgShow={msgShow}
                  chats={chats}
                  setChats={setChats}
                  active={active}
                  setActive={setActive}
                  leaveGroup={leaveGroup}
                  deleteChat={deleteChat}
                />
                <Tooltip title="Начать общение" placement="left">
                  <IconButton
                    onClick={(event) => setOpenIcons(event.currentTarget)}
                    className={classes.button}
                  >
                    <ImportContactsIcon />
                  </IconButton>
                </Tooltip>
                <Popover
                  open={openIconsShow}
                  anchorEl={openIcons}
                  onClose={() => setOpenIcons(null)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  className={classes.popover}
                >
                  <Tooltip title="Создать чат" placement="left">
                    <IconButton
                      onClick={() => {
                        setCreateChat(true);
                        socket.emit("getAllUsers", user.id);
                      }}
                      className={classes.chatButton}
                    >
                      <PersonAddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Создать группу" placement="left">
                    <IconButton
                      onClick={() => {
                        setCreateGroup(true);
                        socket.emit("getAllUsers", user.id);
                      }}
                      className={classes.groupButton}
                    >
                      <GroupAddIcon />
                    </IconButton>
                  </Tooltip>
                </Popover>
              </Grid>
              <Grid
                item
                sm={6}
                md={8}
                xs={12}
                className={
                  msgShow
                    ? classes.messageList +
                      " " +
                      classes.column +
                      " " +
                      classes.message__column
                    : classes.column + " " + classes.message__column
                }
              >
                {!msgShow && (
                  <Typography className={classes.lookmessage}>
                    Выберите кому хотели бы написать
                  </Typography>
                )}
                {msgShow && (
                  <MessageList
                    setMsgShow={setMsgShow}
                    active={active}
                    messages={messages}
                    user={user}
                    sendMessage={sendMessage}
                    setActive={setActive}
                  />
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;

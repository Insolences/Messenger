const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const wsService = require("../service/wsServiceLayer");
const newMsgController = require("./websocketContollers/newMsgController");
const message = require("../models/message");
let senderUsers = [];
let recieverUsers = [];
const socketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", async (socket) => {
    const token = socket.handshake.query.token;
    const { id } = jwt.verify(token, secret);
    const user = await wsService.findUser(id);
    senderUsers.push(
      new Object({
        [socket.id]: {
          id: user.id,
          is_admin: user.is_admin,
          read_only: user.read_only,
          nickname: user.nickname,
          email: user.email,
        },
      })
    );
    recieverUsers = {
      ...recieverUsers,
      [user.id]: [...(recieverUsers[user.id] || []), socket.id],
    };
    const chats = await wsService.findChats(id);

    let messages = [];

    for (const chat of chats[0]) {
      messages.push(await wsService.findMessages(chat.chat_id));
    }
    let baseConnect;
    if (chats || messages) {
      const queryChats = chats[0].map((chat) => ({
        id: chat.chat_id,
        title: chat.type === "public" ? chat.title : chat.nickname,
        message: "",
      }));
      const queryMessages = messages
        .map((array) =>
          array.map((message) => ({
            id: message.id,
            chat_id: message.chat_id,
            sender_id: message.sender_id,
            nickname: message.user.nickname,
            text: message.text,
          }))
        )
        .flat();
      queryMessages.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
      baseConnect = (onlyInfo) => {
        if (onlyInfo) {
          socket.emit("getChats", queryChats);
          socket.emit("getMessages", queryMessages);
        }
        socket.emit("getUserInfo", {
          query: {
            id: user.id,
            is_admin: user.is_admin,
            read_only: user.read_only,
            nickname: user.nickname,
            email: user.email,
          },
        });
      };
      setTimeout(() => baseConnect(false), 2000);
    }
    setTimeout(() => baseConnect(true), 2000);

    // console.log("user_id: ", id);
    // console.log("connection: ", token);
    // console.log("socket: ", socket.id);
    // console.log("clients: ", Object.keys(io.engine.clients));

    socket.on("sendMessage", async (message) => {
      const newMsg = await wsService.createMessage(message);
      const chatUsers = await wsService.chatUsers(message.chat_id);
      const sendMsg = {
        id: newMsg.id,
        chat_id: newMsg.chat_id,
        sender_id: newMsg.sender_id,
        nickname: message.nickname,
        text: newMsg.text,
      };
      for (const user of chatUsers) {
        if (recieverUsers[`${user.user_id}`]) {
          for (const id of recieverUsers[`${user.user_id}`]) {
            io.to(id).emit("newMessage", sendMsg);
          }
        }
      }
    });
    socket.on("disconnect", () => {
      console.log("disconnect", socket.id);
      console.log(recieverUsers);
    });
  });
};

module.exports.socketServer = socketServer;

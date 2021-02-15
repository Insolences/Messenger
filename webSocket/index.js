const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const wsService = require("../service/wsServiceLayer");
const newMsgController = require("./websocketContollers/newMsgController");
const message = require("../models/message");
let senderUsers = {};
let recieverUsers = {};
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
    const chats = await wsService.findChats(id);
    let messages = [];

    for (const chat of chats[0]) {
      messages.push(await wsService.findMessages(chat.chat_id));
    }
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
      // a должно быть равным b
      return 0;
    });

    // console.log("user_id: ", id);
    // console.log("connection: ", token);
    // console.log("socket: ", socket.id);
    // console.log("clients: ", Object.keys(io.engine.clients));
    socket.emit("getUserInfo", {
      query: {
        id: user.id,
        is_admin: user.is_admin,
        read_only: user.read_only,
        nickname: user.nickname,
        email: user.email,
      },
    });
    socket.emit("getChats", queryChats);
    socket.emit("getMessages", queryMessages);
    socket.on("sendMessage", async (socket) => {
      console.log(socket);
      delete socket.nickname;
      const msg = await wsService.createMessage(socket);
    });
  });

  io.on("disconnect", (socket) => {});
};

module.exports.socketServer = socketServer;

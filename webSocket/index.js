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
  const notificationAll = ({ usersId, event, params }) => {
    usersId.forEach((id) => {
      if (recieverUsers[id]) {
        recieverUsers[id].forEach((socketId) => {
          io.to(socketId).emit(event, params);
        });
      }
    });
  };
  io.on("connection", async (socket) => {
    const token = socket.handshake.query.token;
    if (!token) {
      socket.disconnect();
    }
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

    const messages = [];

    for (const chat of chats[0]) {
      messages.push(await wsService.findMessages(chat.chat_id));
    }

    if (chats[0].length !== 0 || messages.length !== 0) {
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
        // .flat();
      queryMessages.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
      setTimeout(() => {
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
      }, 2000);
    }
    setTimeout(() => {
      socket.emit("getUserInfo", {
        query: {
          id: user.id,
          is_admin: user.is_admin,
          read_only: user.read_only,
          nickname: user.nickname,
          email: user.email,
        },
      });
    }, 2000);

    socket.on("sendMessage", async (message) => {
      const newMsg = await wsService.createMessage(message);
      const chatUsers = await wsService.chatUsers(message.chat_id);
      const usersId = chatUsers.reduce((acc, item) => {
        acc.push(item.user_id);
        return acc;
      }, []);

      const sendMsg = {
        id: newMsg.id,
        chat_id: newMsg.chat_id,
        sender_id: newMsg.sender_id,
        nickname: message.nickname,
        text: newMsg.text,
      };

      notificationAll({
        usersId,
        event: "newMessage",
        params: sendMsg,
      });
    });
    socket.on("createChat", async ({ usersId, title, type, ownerId }) => {
      await wsService.createChat({ users, title, type, ownerId });

      notificationAll({usersId, params:{}, event: "updateChats"})
    });
    socket.on("getAllUsers", async () => {
      const users = await wsService.findAllUsers()
      socket.emit("sendAllUsers", users)
    })

    socket.on("disconnect", () => {
      // console.log("disconnect", socket.id);
      // console.log(recieverUsers);
    });
  });
};

module.exports.socketServer = socketServer;

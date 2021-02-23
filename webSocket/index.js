const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const wsService = require("../service/wsServiceLayer");
const wsController = require("../controllers/wsController");
const avatar = require("gravatar");
const AntiSpam = require("socket-io-anti-spam");
let senderUsers = [];
let recieverUsers = [];
const getAvatarURL = (email) => {
  return avatar.url(email, {
    s: 400,
    r: "pg",
    d: "mm",
  });
};

const socketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const socketAntiSpam = new AntiSpam({
    // banTime: 0.5,
    // kickThreshold: 5,
    io: io,
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
      io.disconnect();
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

    const chatIds = chats.reduce((acc, item) => {
      acc.push(item.chat_id);
      return acc;
    }, []);

    const messages = await wsService.findMessages(chatIds);

    if (chats.length !== 0 || messages.length !== 0) {
      const queryChats = chats.map((chat) => ({
        id: chat.chat_id,
        title: chat.type === "public" ? chat.title : chat.nickname,
        type: chat.type,
        user_id: chat.type === "private" ? chat.id : null,
        message: "",
        newChat: false,
        count: 0,
      }));

      const queryMessages = messages
        .map((message) => ({
          id: message.id,
          chat_id: message.chat_id,
          sender_id: message.sender_id,
          nickname: message.user.nickname,
          text: message.text,
        }))
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
      setTimeout(() => {
        socket.emit("getUserInfo", {
          query: {
            id: user.id,
            is_admin: user.is_admin,
            read_only: user.read_only,
            nickname: user.nickname,
            email: user.email,
            img: `https:${getAvatarURL(user.email)}`,
          },
        });
        socket.emit("getChats", queryChats);
        socket.emit("getMessages", queryMessages);
      }, 0);
    }
    setTimeout(() => {
      socket.emit("getUserInfo", {
        query: {
          id: user.id,
          is_admin: user.is_admin,
          read_only: user.read_only,
          nickname: user.nickname,
          email: user.email,
          img: `https:${getAvatarURL(user.email)}`,
        },
      });
    }, 0);

    socket.on(
      "sendMessage",
      wsController.sendMessage({ socket, props: { notificationAll } })
    );
    socket.on("createChat", async (usersId) => {
      const chatId = await wsService.createChat(usersId);
      usersId.map(async (item, index, arr) => {
        const name = await wsService.findNickname(
          index === 0 ? arr[index + 1] : arr[index - 1]
        );
        const queryChats = {
          id: chatId,
          title: name.nickname,
          user_id: index === 0 ? arr[index + 1] : arr[index - 1],
          type: "private",
          message: index === 0 ? "Создан новый чат" : "Вас добавили в чат",
          newChat: true,
        };
        if (recieverUsers[item]) {
          recieverUsers[item].forEach((socketId) => {
            io.to(socketId).emit("newChat", queryChats);
          });
        }
      });
    });
    socket.on("createGroup", async ({ usersId, title }) => {
      const chatId = await wsService.createGroup(usersId, title);
      const queryGroups = {
        id: chatId,
        title: title,
        type: "public",
        user_id: null,
        message: "Создана новая группа",
        newChat: true,
      };
      notificationAll({
        usersId,
        event: "newChat",
        params: queryGroups,
      });
    });
    socket.on("updateProfile", async (data) => {
      const { nickname, email, password, token } = data;
      const { id } = jwt.verify(token, secret);
      if (id) {
        const user = await wsService.updateUser({
          userId: id,
          password,
          nickname,
          email,
        });
        notificationAll({
          usersId: [id],
          event: "getUserInfo",
          params: {
            query: {
              id: user.id,
              is_admin: user.is_admin,
              read_only: user.read_only,
              nickname: user.nickname,
              email: user.email,
              img: `https:${getAvatarURL(user.email)}`,
            },
          },
        });
      }
    });
    socket.on("getAllUsers", async (user_id) => {
      const users = await wsService.findAllUsers(user_id);
      socket.emit("sendAllUsers", users);
    });
    socket.on("leaveGroup", async ({ chat_id, user_id }) => {
      await wsService.leaveGroup(chat_id, user_id);
      const chats = await wsService.findChats(user_id);
      const queryChats = chats[0].map((chat) => ({
        id: chat.chat_id,
        title: chat.type === "public" ? chat.title : chat.nickname,
        type: chat.type,
        user_id: chat.type === "private" ? chat.id : null,
        message: "",
      }));
      notificationAll({
        usersId: [user_id],
        event: "getChats",
        params: queryChats,
      });
    });
    socket.on("deleteChat", async ({ chat_id, usersId }) => {
      const test = await wsService.deleteChat(chat_id, usersId);
      if (!test) {
        return false;
      }
      usersId.map(async (item, index, arr) => {
        const chats = await wsService.findChats(item);

        const queryChats = chats[0].map((chat) => ({
          id: chat.chat_id,
          title: chat.type === "public" ? chat.title : chat.nickname,
          type: chat.type,
          user_id: chat.type === "private" ? chat.id : null,
          message: "",
        }));
        if (recieverUsers[item]) {
          recieverUsers[item].forEach((socketId) => {
            io.to(socketId).emit("getChats", queryChats);
          });
        }
      });
    });

    socketAntiSpam.event.on("spamscore", async (socket, data) => {
      if (data.score === 5) {
        const id =
          senderUsers[senderUsers.findIndex((elem) => elem[socket.id])][
            socket.id
          ].id;
        const user = await wsService.findUser(id);
        io.to(socket.id).emit("getUserInfo", {
          query: {
            id: user.id,
            is_admin: user.is_admin,
            read_only: 1,
            nickname: user.nickname,
            email: user.email,
            img: `https:${getAvatarURL(user.email)}`,
          },
        });
        setTimeout(() => {
          io.to(socket.id).emit("getUserInfo", {
            query: {
              id: user.id,
              is_admin: user.is_admin,
              read_only: user.read_only,
              nickname: user.nickname,
              email: user.email,
              img: `https:${getAvatarURL(user.email)}`,
            },
          });
        }, 10000);
      }
    });

  });
};

module.exports.socketServer = socketServer;

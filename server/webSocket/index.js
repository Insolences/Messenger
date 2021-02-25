const socketIo = require("socket.io");
const wsController = require("../controllers/wsController");
const AntiSpam = require("socket-io-anti-spam");
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
  const socketAntiSpam = new AntiSpam({
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
    prop = await wsController.connection(
      io,
      socket,
      senderUsers,
      recieverUsers
    );
    recieverUsers = prop.recieverUsers;
    senderUsers = prop.senderUsers;

    socket.on("sendMessage", (message) =>
      wsController.sendMessage(message, notificationAll)
    );

    socket.on("createChat", (usersId) =>
      wsController.createChat(io, recieverUsers, usersId)
    );

    socket.on("createGroup", ({ usersId, title }) =>
      wsController.createGroup(usersId, title, notificationAll)
    );

    socket.on("updateProfile", (data) =>
      wsController.updateProfile(data, notificationAll)
    );

    socket.on("getAllUsers", (user_id) =>
      wsController.getAllUsers(socket, user_id)
    );

    socket.on("leaveGroup", ({ chat_id, user_id }) =>
      wsController.leaveGroup(chat_id, user_id, notificationAll)
    );

    socket.on("deleteChat", ({ chat_id, usersId }) =>
      wsController.deleteChat(io, chat_id, usersId, recieverUsers)
    );

    socketAntiSpam.event.on("spamscore", (socket, data) =>
      wsController.spamscore(io, socket, data, senderUsers)
    );

    socket.on("admin", (data) => wsController.admin(io, data, recieverUsers));

    socket.on("disconnect", async () => {
      prop = await wsController.disconnect(
        socket.id,
        senderUsers,
        recieverUsers
      );
      recieverUsers = prop.recieverUsers;
      senderUsers = prop.senderUsers;
    });
  });
};

module.exports.socketServer = socketServer;

const socketIo = require("socket.io");

const wsService = require("../service/wsServiceLayer");
const newMsgController = require("./websocketContollers/newMsgController");

const socketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const chats = [
      { name: "test ok" },
      { name: "next1", img: "https://strana.ua/img/article/2625/70_main.jpeg" },
      {
        name: "next1",
        img: "https://strana.ua/img/article/2625/70_main.jpeg",
        msg: "some msg",
      },
    ];
    // const chats = wsService.getAllChats(1);
    const query = socket.handshake.query;
    console.log("connection: ", query.userId);

    socket.emit("getChats", chats);

    socket.on("newMsg", newMsgController);

    console.log(
      "sockets----------------------------------",
      socket.handshake.query
    );
  });
};

module.exports.socketServer = socketServer;

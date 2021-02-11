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
    const messages = [];
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

    socket.on("newMsgClient", (data) => {
      wsService.createNewMsg({
        title: "user1",
        senderId: 1,
        resiverId: 2,
        text: data.msg,
      });
      console.log("new msg: ", data);
      socket.emit("sendMsg", messages);
    });
  });
};

module.exports.socketServer = socketServer;

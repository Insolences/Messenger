const server = require("http").createServer();

const io = require("socket.io")(server, {
  path: "/",
  transports: "websocket",
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});
// io.of("/").emit("hi", "everyone");

io.on("test", () => {
  console.log("test");
});
server.listen(6000, "localhost");
console.log("Websocket is working on 6000 port...");

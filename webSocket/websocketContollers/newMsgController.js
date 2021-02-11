const newMsgController = (socket) => {

  console.log("new msg: ", socket);
  socket.emit("newMsgServer", socket);
};

module.exports = newMsgController;

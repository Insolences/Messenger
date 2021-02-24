const wsService = require("../../service/wsServiceLayer");

module.exports = getAllUsers = async (socket, user_id) => {
  const users = await wsService.findAllUsers(user_id);
  socket.emit("sendAllUsers", users);
};

const connection = require("./connection");
const sendMessage = require("./sendMessage");
const createChat = require("./createChat");
const createGroup = require("./createGroup");
const updateProfile = require("./updateProfile");
const getAllUsers = require("./getAllUsers");
const leaveGroup = require("./leaveGroup");
const deleteChat = require("./deleteChat");
const spamscore = require("./spamscore");
const admin = require("./admin");
const disconnect = require("./disconnect");

module.exports = {
  sendMessage,
  createChat,
  connection,
  createGroup,
  updateProfile,
  getAllUsers,
  leaveGroup,
  deleteChat,
  spamscore,
  admin,
  disconnect,
};

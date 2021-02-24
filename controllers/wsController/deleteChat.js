const wsService = require("../../service/wsServiceLayer");

module.exports = deleteChat = async (io, chat_id, usersId, recieverUsers) => {
  const test = await wsService.deleteChat(chat_id, usersId);
  if (!test) {
    return false;
  }
  usersId.map(async (item, index, arr) => {
    const chats = await wsService.findChats(item);

    const queryChats = chats.map((chat) => ({
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
};

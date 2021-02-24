const wsService = require("../../service/wsServiceLayer");

module.exports = leaveGroup = async (chat_id, user_id, notificationAll) => {
  await wsService.leaveGroup(chat_id, user_id);
  const chats = await wsService.findChats(user_id);
  const queryChats = chats.map((chat) => ({
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
};

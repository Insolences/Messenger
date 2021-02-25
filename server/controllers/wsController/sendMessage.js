const wsService = require("../../service/wsServiceLayer");

module.exports = sendMessage = async (message, notificationAll) => {
  const user = await wsService.findUser(message.sender_id);
  if (user.read_only || message.text.length > 500) {
    return false;
  }
  const newMsg = await wsService.createMessage(message);
  const chatUsers = await wsService.chatUsers(message.chat_id);
  const usersId = chatUsers.reduce((acc, item) => {
    acc.push(item.user_id);
    return acc;
  }, []);

  const sendMsg = {
    id: newMsg.id,
    chat_id: newMsg.chat_id,
    sender_id: newMsg.sender_id,
    nickname: message.nickname,
    text: newMsg.text,
  };

  notificationAll({
    usersId,
    event: "newMessage",
    params: sendMsg,
  });
};

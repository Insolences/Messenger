const wsService = require("../../service/wsServiceLayer");
module.exports = createChat = async (io, recieverUsers, usersId) => {
  const chatId = await wsService.createChat(usersId);
  usersId.map(async (item, index, arr) => {
    const name = await wsService.findNickname(
      index === 0 ? arr[index + 1] : arr[index - 1]
    );
    const queryChats = {
      id: chatId,
      title: name.nickname,
      user_id: index === 0 ? arr[index + 1] : arr[index - 1],
      type: "private",
      message: index === 0 ? "Создан новый чат" : "Вас добавили в чат",
      newChat: true,
    };
    if (recieverUsers[item]) {
      recieverUsers[item].forEach((socketId) => {
        io.to(socketId).emit("newChat", queryChats);
      });
    }
  });
};

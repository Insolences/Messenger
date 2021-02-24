const wsService = require("../../service/wsServiceLayer");

module.exports = createGroup = async (usersId, title, notificationAll) => {
  const chatId = await wsService.createGroup(usersId, title);
  const queryGroups = {
    id: chatId,
    title: title,
    type: "public",
    user_id: null,
    message: "Создана новая группа",
    newChat: true,
  };
  notificationAll({
    usersId,
    event: "newChat",
    params: queryGroups,
  });
};

const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");
const wsService = require("../../service/wsServiceLayer");
const avatar = require("gravatar");
const getAvatarURL = (email) => {
  return avatar.url(email, {
    s: 400,
    r: "pg",
    d: "mm",
  });
};
module.exports = connection = async (
  io,
  socket,
  senderUsers,
  recieverUsers
) => {
  const token = socket.handshake.query.token;
  if (!token) {
    io.disconnect();
  }
  const { id } = jwt.verify(token, secret);
  const user = await wsService.findUser(id);
  senderUsers.push(
    new Object({
      [socket.id]: {
        id: user.id,
        is_admin: user.is_admin,
        read_only: user.read_only,
        nickname: user.nickname,
        email: user.email,
      },
    })
  );
  recieverUsers = {
    ...recieverUsers,
    [user.id]: [...(recieverUsers[user.id] || []), socket.id],
  };
  const chats = await wsService.findChats(id);

  const chatIds = chats.reduce((acc, item) => {
    acc.push(item.chat_id);
    return acc;
  }, []);

  const messages = await wsService.findMessages(chatIds);

  if (chats.length !== 0 || messages.length !== 0) {
    const queryChats = chats.map((chat) => ({
      id: chat.chat_id,
      title: chat.type === "public" ? chat.title : chat.nickname,
      type: chat.type,
      user_id: chat.type === "private" ? chat.id : null,
      message: "",
      newChat: false,
      count: 0,
    }));

    const queryMessages = messages
      .map((message) => ({
        id: message.id,
        chat_id: message.chat_id,
        sender_id: message.sender_id,
        nickname: message.user.nickname,
        text: message.text,
      }))
      .flat();
    queryMessages.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    setTimeout(() => {
      socket.emit("getUserInfo", {
        query: {
          id: user.id,
          is_admin: user.is_admin,
          read_only: user.read_only,
          nickname: user.nickname,
          email: user.email,
          img: `https:${getAvatarURL(user.email)}`,
        },
      });
      socket.emit("getChats", queryChats);
      socket.emit("getMessages", queryMessages);
    }, 0);
  }
  setTimeout(() => {
    socket.emit("getUserInfo", {
      query: {
        id: user.id,
        is_admin: user.is_admin,
        read_only: user.read_only,
        nickname: user.nickname,
        email: user.email,
        img: `https:${getAvatarURL(user.email)}`,
      },
    });
  }, 0);
  return { senderUsers, recieverUsers };
};

const wsService = require("../../service/wsServiceLayer");
const avatar = require("gravatar");
const getAvatarURL = (email) => {
  return avatar.url(email, {
    s: 400,
    r: "pg",
    d: "mm",
  });
};

module.exports = spamscore = async (io, socket, data, senderUsers) => {
  if (data.score === 5) {
    const id =
      senderUsers[senderUsers.findIndex((elem) => elem[socket.id])][socket.id]
        .id;
    const user = await wsService.findUser(id);
    io.to(socket.id).emit("getUserInfo", {
      query: {
        id: user.id,
        is_admin: user.is_admin,
        read_only: 1,
        nickname: user.nickname,
        email: user.email,
        img: `https:${getAvatarURL(user.email)}`,
      },
    });
    setTimeout(() => {
      io.to(socket.id).emit("getUserInfo", {
        query: {
          id: user.id,
          is_admin: user.is_admin,
          read_only: user.read_only,
          nickname: user.nickname,
          email: user.email,
          img: `https:${getAvatarURL(user.email)}`,
        },
      });
    }, 10000);
  }
};

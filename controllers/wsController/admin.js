const avatar = require("gravatar");
const getAvatarURL = (email) => {
  return avatar.url(email, {
    s: 400,
    r: "pg",
    d: "mm",
  });
};

module.exports = admin = (io, data, recieverUsers) => {
  const bannedUsers = data.filter((user) => user.is_blocked);
  const updateUsers = data.filter((user) => !user.is_blocked);

  bannedUsers.map((user) => {
    if (recieverUsers[user.id]) {
      recieverUsers[user.id].forEach((socketId) => {
        io.to(socketId).emit("bannedUser");
      });
    }
  });
  updateUsers.map((user) => {
    if (recieverUsers[user.id]) {
      recieverUsers[user.id].forEach((socketId) => {
        io.to(socketId).emit("getUserInfo", {
          query: {
            id: user.id,
            is_admin: user.is_admin,
            read_only: user.read_only,
            nickname: user.nickname,
            email: user.email,
            img: `https:${getAvatarURL(user.email)}`,
          },
        });
      });
    }
  });
};

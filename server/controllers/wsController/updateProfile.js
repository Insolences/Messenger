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

module.exports = updateProfile = async (data, notificationAll) => {
  const { nickname, email, password, token } = data;
  const { id } = jwt.verify(token, secret);
  if (id) {
    const user = await wsService.updateUser({
      userId: id,
      password,
      nickname,
      email,
    });
    notificationAll({
      usersId: [id],
      event: "getUserInfo",
      params: {
        query: {
          id: user.id,
          is_admin: user.is_admin,
          read_only: user.read_only,
          nickname: user.nickname,
          email: user.email,
          img: `https:${getAvatarURL(user.email)}`,
        },
      },
    });
  }
};

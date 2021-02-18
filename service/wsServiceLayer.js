require("dotenv").config({ path: "../.env" });
const db = require("../models");
const bcrypt = require("bcrypt");
const salt = +process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const { Op } = require("sequelize");
const reg = /^[a-zA-Z0-9]+$/;

const adapterChat = (arr, chatId) => {
  return arr.reduce((acc, item) => {
    acc.push({
      chat_id: chatId,
      user_id: item,
    });
    return acc;
  }, []);
};

const findUser = (id) => {
  return db.user.findOne({ where: { id } });
};

exports.findUser = findUser;
exports.findChats = (id) => {
  return db.sequelize.query(
    `SELECT uc1.chat_id, users.nickname,users.id, chats.type, chats.title  FROM user_chats as uc1
JOIN chats ON chats.id = uc1.chat_id
LEFT OUTER JOIN user_chats as uc2 ON uc2.chat_id = uc1.chat_id AND uc2.user_id != ${id} AND chats.type = 'private'
LEFT OUTER JOIN users ON users.id = uc2.user_id
WHERE uc1.user_id = ${id}`
  );
};
exports.findMessages = (chat_id) => {
  return db.message.findAll({
    where: { chat_id },
    include: [
      {
        model: db.user,
        attributes: ["nickname"],
      },
    ],
  });
};
exports.createMessage = (message) => {
  return db.message.create(message);
};
exports.chatUsers = (chat_id) => {
  return db.user_chat.findAll({ where: { chat_id } });
};
exports.findAllUsers = async (user_id) => {
  const users = await db.user.findAll({
    where: {
      id: {
        [Op.ne]: user_id,
      },
    },
  });
  return users.reduce((acc, item) => {
    acc.push({
      id: item.id,
      nickname: item.nickname,
    });
    return acc;
  }, []);
};
exports.updateUser = async ({ userId, password, email, nickname }) => {
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await findUser(userId);
  if (user) {
    await user.update({
      email,
      nickname,
      password:
        !reg.test(password) || !password ? user.password : hashedPassword,
    });
  }
  return user;
};

exports.createChat = async (usersId) => {
  const chat = await db.chat.create({
    type: "private",
  });
  await db.user_chat.bulkCreate(adapterChat(usersId, chat.id));
  return chat.id;
};
exports.createGroup = async (usersId, title) => {
  const chat = await db.chat.create({
    type: "public",
    title,
  });
  await db.user_chat.bulkCreate(adapterChat(usersId, chat.id));
  return chat.id;
};

exports.findNickname = (id) => {
  return db.user.findOne({ where: { id }, attributes: ["nickname"] });
};
exports.leaveGroup = (chat_id, user_id) => {
  return db.user_chat.destroy({
    where: {
      chat_id,
      user_id,
    },
  });
};
exports.deleteChat = async (chat_id, usersId) => {
  try {
    await db.chat.destroy({ where: { id: chat_id } });
    const data = adapterChat(usersId, chat_id);
    data.map(async (item) => {
      await db.user_chat.destroy({
        where: item,
      });
    });
    return true;
  } catch (e) {
    return false;
  }
};

require("dotenv").config({ path: "../.env" });
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

const adapterChat = (arr = [], chatId) => {
  return arr.reduce((acc, item) => {
    acc.push({
      chat_id: chatId,
      user_id: item,
    });
  }, []);
};

exports.findUser = (id) => {
  return db.user.findOne({ where: { id } });
};
exports.findChats = (id) => {
  return db.sequelize.query(
    `SELECT uc1.chat_id, users.nickname, chats.type, chats.title  FROM user_chats as uc1
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
exports.findAllUsers = async () => {
  const users = await db.user.findAll();
  return users.reduce((acc, item) => {
    acc.push({
      id: item.id,
      nickname: item.nickname,
    });
    return acc;
  }, []);
};

exports.createChat = async ({
  users = [],
  ownerId = null,
  title = null,
  type,
}) => {
  const chat = await db.chat.create({
    type,
    title,
    ownerId,
  });
  db.user_chat.bulkCreate(adapterChat(users, chat.id));
};

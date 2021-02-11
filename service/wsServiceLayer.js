const db = require("../models");

const getAllChats = (id) => {
  const chats = db.chat.findAll({
    where: {
      id: id,
    },
  });

  return chats;
};

const getAllMsg = (userId, companionId) => {};

const createNewMsg = async ({ senderId, resiverId, text, title }) => {
  const msg = await db.message.create({
    title,
    text,
    user_id: senderId,
  });

  db.chat.create({
    user1: senderId,
    user2: resiverId,
    msg_id: msg.id,
  });

  db.user_group.create({
		user_id: senderId,
		group_id: resiverId
	});
  db.user_group.create({
		user_id: resiverId,
		group_id: senderId
	});
};

module.exports = { getAllChats, getAllMsg, createNewMsg };

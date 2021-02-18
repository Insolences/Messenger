require("dotenv").config({ path: "../.env" });
const db = require("../models");
const sequelize = require("sequelize");


exports.allUsers = () => {
    const allUsers = db.user.findAll();
    return allUsers;
};

exports.updateUsers = async (id, is_admin, is_blocked, read_only) => {
    const updUsers = await db.user.update(
        { is_admin: is_admin, 
        is_blocked: is_blocked,
        read_only: read_only
        }, { where: {
          id: id
        }
      }
    );
    return updUsers;
};

exports.getAllChats = async() =>{

  const allChats = await db.chat.findAll({
    where: {
      type: "public"
    }
  });

  const allUsersGroupChats = await db.sequelize.query(`select distinct users.id, users.nickname, user_chats.chat_id 
  from users
  Left join user_chats
  on user_chats.user_id = users.id
  where user_chats.chat_id in (select chats.id from chats
  where chats.type = "public")`);

  return [allChats, allUsersGroupChats];

};

exports.findUser = (search) => {
  const findUser = db.user.findAll(
    {
      where: {
        nickname: {
          [sequelize.Op.like]: search + '%'
        }
      }
    }
  );
  return findUser;
};

exports.deleteUsersOfChats = (chat_id, user_id) => {
  const deleteUOC = db.user_chat.destroy({
      where: {
        [sequelize.Op.and]: [
          {chat_id: chat_id},
          {user_id: user_id}
        ]
      }
    }
  );
  return deleteUOC;
};

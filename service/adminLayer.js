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

exports.getAllChats = () =>{
  const allChats = db.sequelize.query(`SELECT DISTINCT chats.id, chats.title, users.nickname
  from user_chats
  join users on users.id = user_chats.user_id
  join chats on chats.id = user_chats.chat_id
  where chats.type = "public"`);
    return allChats;
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

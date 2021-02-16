require("dotenv").config({ path: "../.env" });
const db = require("../models");


exports.allUsers = () => {
    const allUsers = db.user.findAll();
    console.log(allUsers);
    return allUsers;
};

exports.updateUsers = (id, is_admin, is_blocked, read_only) => {
    const updUsers = db.user.update(
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
  const allChats = db.chat.findAll();
    console.log(allChats);
    return allChats;
};

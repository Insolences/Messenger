"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class user_chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({model}) {

    }
    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
        chat_id: undefined,
      };
    }
  }
  user_chat.init(
    {
      chat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "user_chats",
      modelName: "user_chat",
    }
  );
  return user_chat;
};

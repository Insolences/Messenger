"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({model}) {
      
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  chat.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM("private", "public"),
      },
      owner_id: {
        type: DataTypes.INTEGER,
      },
    },
    
    {
      sequelize,
      tableName: "chats",
      modelName: "chat",
    }
  );
  return chat;
};
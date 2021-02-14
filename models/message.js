"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      // define association here
      this.belongsTo(user, { foreignKey: "sender_id" });
    }
  }
  message.init(
    {
      chat_id: {
        type: DataTypes.INTEGER,
      },
      sender_id: {
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      tableName: "messages",
      modelName: "message",
    }
  );
  return message;
};

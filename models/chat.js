'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  chat.init({
    user1: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    user2: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    msg_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    tableName: 'chats',
    modelName: 'chat',
  });
  return chat;
};

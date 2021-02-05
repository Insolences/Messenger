"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ group_message }) {
      // define association here
      this.belongsTo(group_message, { foreignKey: "id" });
    }
  }
  message.init({
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    text: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        max: {
          args: 500,
          msg: "Too long message",
        },
      },
    },
    user_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    sequelize,
    modelName: "message",
  });
  return message;
};

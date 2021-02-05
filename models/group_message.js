"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group_message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ group }) {
      // define association here
      this.belongsTo(group, { foreignKey: "group_id" });
    }
  }
  group_message.init(
    {
      group_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      message_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "group_messages",
      modelName: "group_message",
    }
  );
  return group_message;
};

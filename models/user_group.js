"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(user) {
      // define association here
      this.belongsTo(user, { foreignKey: "used_id" });
    }
  }
  user_group.init(
    {
      user_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      group_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "user_groups",
      modelName: "user_group",
    }
  );
  return user_group;
};

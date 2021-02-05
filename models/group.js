"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_group, group_message }) {
      // define association here
      this.belongsTo(user_group, { foreignKey: "id" });
      this.hasMany(group_message, { foreignKey: "id" });
    }
  }
  group.init(
    {
      owner_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "groups",
      modelName: "group",
    }
  );
  return group;
};

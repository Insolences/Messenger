"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_group }) {
      // define association here
      this.hasMany(user_group, { foreignKey: "id" });
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  user.init(
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Login must be not empty" },
          notNull: { msg: "user must have a login" },
          min: {
            args: 3,
            msg: "Login must be more then 3",
          },
          is: /^[a-zA-Z0-9]+$/,
        },
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "nickname",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[a-zA-Z0-9]+$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      is_Admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      is_Blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "user",
    }
  );

  return user;
};

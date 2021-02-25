"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ message }) {
      // define association here
      this.hasMany(message, { foreignKey: "id" });

    }
    toJSON() {
      return { ...this.get(), password: undefined, createdAt: undefined, updatedAt: undefined };
    }
  }
  user.init(
    {
      login: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "Login must be not empty" },
          notNull: { msg: "user must have a login" },
          min: {
            args: 3,
            msg: "Login must be more then 3",
          },
        },
      },

      nickname: {
        type: DataTypes.STRING,
        defaultValue: "nickname",
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      read_only: {
        type: DataTypes.BOOLEAN,
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

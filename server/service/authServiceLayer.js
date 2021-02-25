require("dotenv").config({ path: "../.env" });
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

exports.find = (login) => {
  return db.user.findOne({ where: { login } });
};

exports.create = (login, password, email = "test@email.com") => {
  const hash = bcrypt.hashSync(password, saltRounds);
  const newUser = db.user.create({
    login,
    nickname: login,
    password: hash,
    email,
  });

  return newUser;
};

exports.generateAccessToken = (id, is_admin) => {
  const payload = {
    id,
    is_admin,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const reg = /^[a-zA-Z0-9]+$/;
const authServiceLayer = require("../service/authServiceLayer");

class AuthController {
  async auth(req, res) {
    const { login, password, email, social } = req.body;
    if (!reg.test(password)) {
      return res
        .status(400)
        .json({ message: `Пароль имеет не поддерживаемые символы` });
    }
    try {
      let user = await authServiceLayer.find(login);

      if (!user) {
        user = await authServiceLayer.create(login, password, email);
      }

      if (!social) {
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
          return res.status(403).json({ message: `Введен неверный пароль` });
        }
      }

      const token = authServiceLayer.generateAccessToken(
        user.id,
        user.is_admin
      );

      res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
  async verify(req, res) {
    const { token } = req.body;
    try {
      const { id } = jwt.verify(token, secret);
      res.status(200).json({ id });
    } catch (e) {
      res.status(401).json({
        message: "Пользователь не авторизован или закончилось действия токена",
      });
    }
  }
  async access(req, res) {
    const { token } = req.headers;

    try {
      const { isAdmin } = jwt.verify(token, secret);
      if (!isAdmin) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
    } catch (e) {
      return res.status(401).json({
        message: "Пользователь не авторизован или закончилось действия токена",
      });
    }
  }
}

module.exports = new AuthController();

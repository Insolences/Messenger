require("dotenv").config({ path: "../.env" });
const db = require("../models");
const bcrypt = require("bcrypt");
const reg = /^[a-zA-Z0-9]+$/;
const authServiceLayer = require("../service/authServiceLayer");


class AuthController {
  async auth(req, res) {
    const { login, password, email } = req.body;
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

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(403).json({ message: `Введен неверный пароль` });
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
}

module.exports = new AuthController();

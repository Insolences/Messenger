const authServiceLayer = require("../service/authServiceLayer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

class AuthController {
  async auth(req, res) {
    // let login;
    // if (req.user) {
    //   login = req.user.email
    //     ? req.user.email.split("@")[0] + "_google"
    //     : (login = req.user.username + "_github");
    // }
    // if (req.body.login) {
    //   login = req.body.login;
    // }
    // if (!login) {
    //   return res.status(400);
    // }
    const { login, password, email, social } = req.body;
    console.log(social);
    // const email = social ? req.user.email || undefined : undefined;
    // const password =
    // req.body.password || Math.random().toString(36).substring(2);
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
    console.log(token);

    try {
      const { id } = jwt.verify(token, secret);
      res.status(200).json({ id });
    } catch (e) {
      return res.status(401).json({
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

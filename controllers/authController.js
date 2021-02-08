require("dotenv").config({ path: "../.env" });
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

const generateAccessToken = (id, is_admin) => {
  const payload = {
    id,
    is_admin,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async auth(req, res) {
    const { login, password, email } = req.body;

    try {
      let user = await db.user.findOne({ where: { login } });

      if (!user) {
        const hash = bcrypt.hashSync(password, saltRounds);
        const newUser = await db.user.create({
          login,
          password: hash,
          email,
        });
        user = newUser;
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(403).json({ message: `Введен неверный пароль` });
      }

      const token = generateAccessToken(user.id, user.is_admin);

      res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AuthController();

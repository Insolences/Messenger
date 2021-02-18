require("dotenv").config();
const db = require("./models");
const express = require("express");
const app = express();
const cors = require("cors");
const HOST = process.env.DB_HOST;
const PORT = process.env.PORT;
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const { socketServer } = require("./webSocket/index");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use(`/${process.env.SR_URL}`, authRouter);
app.use(`/${process.env.SR_URL}`, adminRouter);

const server = app.listen(PORT, async () => {
  console.log(`Server up on http://${HOST}:${PORT}`);
  await db.sequelize.authenticate();
  console.log("Database Connected");
});

socketServer(server); // Подключение websocket
// let id = 1;
// db.sequelize
//   .query(
//     `SELECT uc1.chat_id, users.nickname, chats.type, chats.title  FROM user_chats as uc1
// JOIN chats ON chats.id = uc1.chat_id
// LEFT OUTER JOIN user_chats as uc2 ON uc2.chat_id = uc1.chat_id AND uc2.user_id != ${id} AND chats.type = 'private'
// LEFT OUTER JOIN users ON users.id = uc2.user_id
// WHERE uc1.user_id = ${id}`
//   )
//   .then((chats) => console.log(JSON.stringify(chats)));

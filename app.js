require("dotenv").config();
const db = require("./models");
const express = require("express");
const app = express();
const cors = require("cors");
const HOST = process.env.DB_HOST;
const PORT = process.env.PORT;
const authRouter = require("./routes/authRouter");
const { socketServer } = require("./webSocket/index");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use(`/${process.env.SR_URL}`, authRouter);

const server = app.listen(PORT, async () => {
  console.log(`Server up on http://${HOST}:${PORT}`);
  await db.sequelize.authenticate();
  console.log("Database Connected");
});

socketServer(server); // Подключение websocket

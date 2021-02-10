require("dotenv").config();
const db = require("./models");
const express = require("express");
const app = express();
const cors = require("cors");
const HOST = process.env.DB_HOST;
const PORT = process.env.PORT;
const authRouter = require("./routes/authRouter");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use(`/${process.env.SR_URL}`, authRouter);

const server = app.listen(PORT, async () => {
  console.log(`Server up on http://${HOST}:${PORT}`);
  await db.sequelize.authenticate();
  console.log("Database Connected");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("getChats", [
    { name: "test ok" },
    { name: "next1", img: "https://strana.ua/img/article/2625/70_main.jpeg" },
  ]);
});

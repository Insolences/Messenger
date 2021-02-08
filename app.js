require('dotenv').config()
const db = require('./models')
const express = require('express')
const app = express()
const HOST = process.env.DB_HOST
const PORT = process.env.PORT

app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, async () => {
	console.log(`Server up on http://${HOST}:${PORT}`);
	await db.sequelize.authenticate();
	console.log('Database Connected');
})
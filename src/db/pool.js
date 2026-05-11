const mysql = require("mysql2/promise");

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT || 3306);
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const useSsl =
	process.env.DB_SSL === "true" || /aivencloud\.com$/i.test(host || "");
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false";

const pool = mysql.createPool({
	host,
	port,
	user,
	password,
	database,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	ssl: useSsl ? { rejectUnauthorized } : undefined,
});

module.exports = pool;

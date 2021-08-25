const mysql = require("mysql");
require("dotenv").config();
// 這裡Promise大寫是為了取代原本的Promise
const Promise = require("bluebird");

// 設定連線資料
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection = Promise.promisifyAll(connection);
module.exports = connection;
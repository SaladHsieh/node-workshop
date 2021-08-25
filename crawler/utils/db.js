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

// 這裡的Promise是 L4 被bluebird取代的 Promise
connection = Promise.promisifyAll(connection);

// // 原本connection函式(callback版)
// connection.connect
// connection.query
// // 用了blue擴充會多兩個(Promise版)函式，並回傳Promise物件
// connection.connectAsync()
// connection.queryAsync()

// module.exports 從初始的空{}指向新的connection物件
module.exports = connection;

// // require時拿的方式
// const connection = require("./utils/db");
// connection.query


// // 在module.exports 增加一個connection屬性，而這個connection變數是指向另外一個connection物件(看示意圖)
// module.exports.connection = connection;

// // require時拿的方式
// const connection = require("./utils/db");
// // 方法(一)
// const db = require();
// db.connection.query
// // 或是方法(二):取db這個屬性
// const { connection } = require(./utils/db);
// connection.query

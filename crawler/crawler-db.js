const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上", err);
    }
});

// 不關閉連線，認為程式一直在執行
connection.end();

const axios = require("axios");
const moment = require("moment");

// fs讀股票代碼
const fs = require("fs");

// console.log(moment().format('YYYYMMDD'));

function getStockCode() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            //先讀到stockCode
            if (err) {
                reject(err);
            } else {
                resolve(stockCode.trim());
                // 移除前後空白自元, 包含換行 **收到資料要處理!!很重要!!**
            }
        });
    });
}

function readFile(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode, //**注意格式**用.trim()除去空白.換行字元
        },
    });
}

// 立即函式前一定要分號區隔
// (async function () {
//     try {
//         let theStock = await getStockCode();
//         let getData = await readFile(theStock);
//         console.log(getData.data);
//     } catch (e) {
//         console.error(e);
//     }
// })();

// async function result() {
//     try {
//         let stockNo = await getStockCode();
//         let getData = await readFile(stockNo);
//         console.log(getData.data);
//     } catch(e) {
//         console.error(e);
//     }
// }
// result();

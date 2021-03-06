// 套件
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

//設定連線
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上");
    }
});

// 讀股票代碼
function queryStockPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                reject(err);
            } else {
                resolve(stockCode.trim());
                // **注意格式**用.trim()移除前後空白字元, 包含換行 **收到資料要處理!!很重要!!**
            }
        });
    });
}

// 查看資料庫有沒有此股票代碼
function queryStockCode(stockCode) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM `stock` WHERE `stock_id` = ?",
            [stockCode],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
}

// 證交所爬資料
function readStockPromise(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode,
        },
    });
}

// fields: [
//     '日期',     '成交股數',
//     '成交金額', '開盤價',
//     '最高價',   '最低價',
//     '收盤價',   '漲跌價差',
//     '成交筆數'
//   ],
// 照整理好的資料內容插入 stock_price 欄位 stock_id	date open_price	high_price low_price close_price delta_price transactions volume amount
function insertStockData(parsedData) {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?", // IGNORE 忽略重複部分
            [parsedData],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
}

(async function () {
    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        let stockCode = await queryStockPromise();
        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        let dbResults = await queryStockCode(stockCode);
        if (dbResults.length === 0) {
            throw "此股票代碼不在服務範圍內";
        }
        console.info("在資料庫有查到資料");
        // 3. 如果是，才去證交所抓資料
        let stockData = await readStockPromise(stockCode);
        const twseData = stockData.data;
        if (twseData.stat !== "OK") {
            throw "系統有誤, 請聯絡客服, 或請稍後再試, 謝謝!";
        }
        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        // 4-1. data是一個大陣列, 裡面每一個元素也是一個陣列
        // 4-2. 整理收到的資料格式, 判定stat是不是ok
        // 4-3. 改西元年(資料庫都是西元年) 拿掉/, 轉成int, +19110000 。parseInt(string, 10); 10進位
        // 4-4. 拿掉逗號
        // 4-5  插入stock_id
        let parsedData = twseData.data.map((item) => {
            item = item.map((value) => {
                return value.replace(/,/g, "");
            });
            item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;

            //插入stock_id
            item.unshift(stockCode);
            return item;
        });
        console.log(parsedData);
        // let insertResult = await insertStockData(parsedData);
        // console.log(insertResult);
    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
})();

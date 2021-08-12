// 套件
const axios = require("axios");
const moment = require("moment");
// fs讀股票代碼
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

// 設定連線資料
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 準備連線
connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上", err);
    }
});

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

function queryStockDataPromise(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode,
        },
    });
}

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
            "INSERT INTO IGNORE stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?", // IGNORE 忽略重複部分
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

async function result() {
    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        let stockNo = await getStockCode();
        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        let dbResults = await queryStockCode(stockNo);
        if (dbResults.length === 0) {
            // console.warn("此股票代碼不在服務範圍內");
            // return;
            throw "此股票代碼不在服務範圍內";
        }
        console.info("在資料庫有查到資料");

        // 3. 如果是，才去證交所抓資料
        let getData = await queryStockDataPromise(stockNo);

        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        // 4-1. data是一個大陣列, 裡面每一個元素也是一個陣列
        // 4-2. 整理收到的資料格式, 判定stat是不是ok
        // 4-3. 改西元年(資料庫都是西元年) 拿掉/, 轉成int, +1911
        // 4-4. 拿掉逗號

        const twseData = getData.data;
        if (twseData.stat !== "OK") {
            throw "系統有誤, 請聯絡客服, 或請稍後再試, 謝謝!";
        }
        let parsedData = twseData.data.map((item) => {
            item = item.map((value) => {
                return value.replace(/,/g, "");
            });
            item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
            // console.log(item);
            // console.log("-----------");

            //插入stock_id
            item.unshift(stockNo);
            return item;
        });
        console.log(parsedData);

        let insertResult = await insertStockData(parsedData);
        console.log(insertResult);
    } catch (e) {
        console.error(e);
    } finally {
        // 不關閉連線，認為程式一直在執行
        connection.end();
    }
}
result();

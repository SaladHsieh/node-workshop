// 套件
const axios = require("axios");
const moment = require("moment");
// fs讀股票代碼
const fs = require('fs/promises');
const Promise = require("bluebird");
const connection = require("./utils/db");
const { insertStockData } = require("./utils/TWSEDataProcessor");

(async function () {
    try {
        // 1. 讀 stock.txt 把股票代碼讀進來
        let stockCode = await fs.readFile("stock.txt", "utf8");
        // 2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
        await connection.connectAsync()
        let dbResults = await connection.queryAsync(
            "SELECT * FROM `stock` WHERE `stock_id` = ?",
            [stockCode.trim()],
        );
        console.log(dbResults);

        if (dbResults.length === 0) {
            throw "此股票代碼不在服務範圍內";
        }
        console.info("在資料庫有查到資料");
        // 3. 如果是，才去證交所抓資料
        let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: stockCode.trim(),
            },
        });
        const twseData  = response.data;
        if (twseData.stat !== "OK") {
          throw "從證交所查到的資料有問題!";
        }
        // console.log(twseData);

        // 4. 抓回來的資料存到資料庫的 stock_price 表格裡去
        let parsedData = insertStockData(stockCode.trim(), twseData.data);
        let results = await connection.queryAsync(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
            [parsedData]
          );
        console.log(parsedData);
    } catch (e) {
        console.error(e);
    } finally {
        // 不關閉連線，認為程式一直在執行
        connection.end();
    }
})();

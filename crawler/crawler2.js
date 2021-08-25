const axios = require("axios");
const moment = require("moment");

// fs讀股票代碼
const fs = require("fs");

// console.log(moment().format('YYYYMMDD'));

// then catch用法
new Promise((resolve, reject) => {                              // Promise 物件
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
        //先讀到stockCode
        if (err) {
            reject(err);
        } else {
            resolve(stockCode.trim());
            // 可以先console.log確認一下stockCode是不是正確
            // .trim()移除前後空白字元, 包含換行 **收到資料要處理!!很重要!!**
        }
    });
})
    .then((stockCode) => {
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {    // Promise 物件(axios -> Promise based )
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: stockCode, //**注意格式**用.trim()除去空白.換行字元
            },
        });
    })
    .then((result) => {
        console.log(result.data);
    })
    .catch((error) => {
        console.log(error);
    });

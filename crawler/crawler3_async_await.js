const axios = require("axios");
const moment = require("moment");
const fs = require("fs"); // fs讀股票代碼

// console.log(moment().format('YYYYMMDD'));

function getStockCode() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            //先讀到stockCode
            if (err) {
                reject(err);
            } else {
                resolve(stockCode.trim());
                // **注意格式**用.trim()移除前後空白字元, 包含換行 **收到資料要處理!!很重要!!**
            }
        });
    });
}

function readFile(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode,
        },
    });
}

(async function () {
    try {
        let theStock = await getStockCode();
        let getData = await readFile(theStock);
        console.log(getData.data);
    } catch (e) {
        console.error(e);
    }
})();

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

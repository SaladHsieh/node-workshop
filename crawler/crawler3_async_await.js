const axios = require('axios');
const moment = require('moment');

// fs讀股票代碼
const fs = require('fs');

// console.log(moment().format('YYYYMMDD'));

let getStockCode = function () {
    return new Promise ((resolve, reject) => {
        fs.readFile('stock.txt', 'utf8', (err, stockCode) => {  //先讀到stockCode
            if (err) {
                reject(err);
            } else {
                resolve(stockCode);
                console.log(stockCode.trim());
                // 確認一下stockCode是不是正確
            }
        })
    });
}

let readFile = function (stockCode) {
    axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
        params: {
            response:'json',
            date:moment().format('YYYYMMDD'),
            stockNo: stockCode,  //**注意格式**用.trim()除去空白.換行字元
            },
    });
}

// 直接執行
(async function () {
    try {
        let theStock = await getStockCode();
        let getData = await readFile(theStock);
        console.log(getData.data);
    } catch (e) {
        console.log(e);
    }
})();


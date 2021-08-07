const axios = require('axios');
const moment = require('moment');

// fs讀股票代碼
const fs = require('fs');

// console.log(moment().format('YYYYMMDD'));


// then catch用法
new Promise ((resolve, reject) => {
    fs.readFile('stock.txt', 'utf8', (err, stockCode) => {  //先讀到stockCode
        if (err) {
            reject(err);
        } else {
            resolve(stockCode);
            console.log(stockCode.trim()); //確認一下stockCode是不是正確
        }
    })
}).then((stockCode) => {
    let stockNo = stockCode.trim();
    return axios
        .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
        params: {
            response:'json',
            date:moment().format('YYYYMMDD'),
            stockNo,  //**注意格式**用.trim()除去空白.換行字元
            },
        })
        .then((result) => {
            console.log(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
})


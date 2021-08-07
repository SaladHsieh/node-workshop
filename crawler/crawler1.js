// GET
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?
// response=json
// &
// date=20210807
// &
// stockNo=2330

const axios = require('axios');
const moment = require('moment');

// fs讀股票代碼
const fs = require('fs');

// console.log(moment().format('YYYYMMDD'));

fs.readFile("stock.txt", "utf8", (err, stockCode) => {
    if (err) {
        console.log(err);
    } else {
        axios
            .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
            params: {
                response:'json',
                date:moment().format('YYYYMMDD'),
                stockNo: stockCode,
                },
            })
            .then((response) => {
                console.log(response.data.title);
            })
            .catch((error) =>{
                console.log(error);
            });
    }
})
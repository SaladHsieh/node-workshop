// fields: [
//     '日期',     '成交股數',
//     '成交金額', '開盤價',
//     '最高價',   '最低價',
//     '收盤價',   '漲跌價差',
//     '成交筆數'
//   ],
// 照整理好的資料內容插入 stock_price 欄位 stock_id	date open_price	high_price low_price close_price delta_price transactions volume amount
// 4-1. data是一個大陣列, 裡面每一個元素也是一個陣列
// 4-2. 整理收到的資料格式, 判定stat是不是ok
// 4-3. 改西元年(資料庫都是西元年) 拿掉/, 轉成int, +19110000 。parseInt(string, 10); 10進位
// 4-4. 拿掉逗號
// 4-5  插入stock_id

function insertStockData(stockCode, rawData) {
    // twseData.data
    return rawData.map((item) => {
        item = item.map((value) => {
            return value.replace(/,/g, "");
        });

        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;

        //插入stock_id
        item.unshift(stockCode);
        return item;
    });
} 

module.exports = {
    insertStockData,
};
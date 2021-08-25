const { response, request } = require("express");
const express = require("express");
const connection = require("./utils/db");

// 利用 express 建立了一個 express application
let app = express();

// express是由 middleware 組成，程式由上往下執行，遇到response就結束。所以執行順序很重要!!
// app.get("/about", function (request, response, next) {
//     response.send("遇到response旅行就結束囉~");
// });

// 如果是自訂middleware沒有next()，連線就會一直pending，最後造成連線逾時(time out)。
app.use((req, res, next) => {
    let current = new Date();
    console.log(`Visit 1 at ${current.toISOString()}`);
    next();
});

app.use((req, res, next) => {
    console.log("This is second line!");
    next();
});

// HTTP Method: get, post, put, patch, delete
// router 路由 -> 比對網址
app.get("/", function (request, response, next) {
    response.send("Hello with nodemon");
});

// 如果有重複，遇到第一個就結束
app.get("/about", function (request, response, next) {
    response.send("About Us A ，遇到重複的就結束!");
});

app.get("/about", function (request, response, next) {
    response.send("About Us B");
});

// stock GET API
// response.send -> 傳送文字字串
// response.json -> 傳送json格式
app.get("/stock", async (request, response, next) => {
    // 這裡才建立連線，若遇 DDoS ，連 server 都會壞! -> 不要在每次有request時建立連線!
    let result = await connection.queryAsync("SELECT * FROM stock");
    response.json(result);
})

// web server 啟動時建立資料庫連結
app.listen(3000, async function () {
    await connection.connectAsync();
    console.log("我們的 web server 啟動了～");
  });

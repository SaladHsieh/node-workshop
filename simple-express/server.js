const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

app.use((req, res, next) => {
    console.log("This is first line!");
    next();
});

app.use((req, res, next) => {
    console.log("This is second line!");
    next();
});

// HTTP Method: get, post, put, patch, delete
// router 路由 -> 比對網址
app.get("/", function (request, response, next) {
    response.send("Hello");
});
app.get("/About", function (request, response, next) {
    response.send("About Us");
});

app.listen(3000, function () {
    console.log("我們的 web server 啟動了～");
});

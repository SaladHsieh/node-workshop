let doWork = function (job, timer, cb) {
    // 模擬一個非同步工作
    setTimeout(() => {
        let dt = new Date();
        // callback 慣用的設計
        // 第一個參數: error
        // 第二個參數: 要回覆的資料
        cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
    }, timer);
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 執行順序：刷牙 -> 洗臉 -> 吃早餐

// node.js 的特性：非同步、非阻塞，收到工作派給其他小兄弟(ＷebAPI的多個thread)做
// 造成的問題：doWork都放在同一層，造成cb完成順序不明（小兄弟一起工作 -> queue -> event loop -> stack）
// 解決辦法：把洗臉放進刷牙的callback裡，確保刷牙完才洗臉 -> callback hell
doWork("刷牙", 3000, function (err, data) {
    // 刷完牙後會被回呼的函式
    // 在這裡代表已經刷完牙
    if (err) {
        console.error("發生錯誤了: ", err);
        return;
    }
    console.log(data);
    doWork("洗臉", 3000, function (err, data) {
        // 洗臉後會被回呼的函式
        // 在這裡代表已經刷完牙
        if (err) {
            console.error("發生錯誤了: ", err);
            return;
        }
        console.log(data);
        doWork("吃早餐", 5000, function (err, data) {
            if (err) {
                console.error("發生錯誤了: ", err);
                return;
            }
            console.log(data);
        });
    });
});

// 正常if else寫法
// doWork("刷牙", 3000, function (err, data) {
//     // 刷完牙後會被回呼的函式
//     // 在這裡代表已經刷完牙
//     if (err) {
//         console.error("發生錯誤了: ", err);
//     } else {
//         console.log(data);
//         doWork("洗臉", 3000, function (err, data) {
//             // 洗臉後會被回呼的函式
//             // 在這裡代表已經刷完牙
//             if (err) {
//                 console.error("發生錯誤了: ", err);
//             } else {
//                 console.log(data);
//                 doWork("吃早餐", 5000, function (err, data) {
//                     if (err) {
//                         console.error("發生錯誤了: ", err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });

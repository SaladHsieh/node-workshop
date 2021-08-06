let doWork = function (job, timer, isOK) {
    // 用 promise 取代 callback
    // 參數 isOK 用來設定成功或失敗條件

    return new Promise((resolve, reject) =>{
        // Promise物件是建構函式(本身是同步),  resolve函式-->成功, reject函式-->失敗
        // console.log("aaa"); // -->用來測試 Promise建構式是同步的
        setTimeout(() => {  // 非同步物件
            let dt = new Date();
            if (isOK) {
                resolve(`完成工作: ${job} at ${dt.toISOString()}`);
            } else {
                reject(`${job} 失敗`);
            }
        }, timer);
    });
}

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

let job1 = doWork('刷牙', 3000, true);

job1 // (1) 可用 then 處理物件成功與失敗 或 (2)用.then 處理成功 .catch 處理失敗 (catch是promise的函示屬性)
    .then ((result) => {
        console.log('resolve函式被呼叫', result);
        return doWork('洗臉', 2000, true);
    })
    .then ((result) => {
        console.log('resolve函式被呼叫', result);
        return doWork('吃早餐', 3000, false);
        // 問題: 為什麼job1.then()如果沒有return, 第二個.then會變成 undefined
    })
    .then ((result) => {
        console.log('resolve函式被呼叫', result);
        return doWork('運動', 4000, true);
    })
    .then ((result) => {
        console.log('resolve函式被呼叫', result);
        return doWork('上課', 2000, true);
    })
    .then ((result) => {
        console.log('resolve函式被呼叫', result);
    })
    .catch ((error) => {
        console.log('reject函式被呼叫', error);
    })
    .finally (() => {
        // 成功或失敗都會在此顯示
        console.log('This function has been executed');
    })


// job1.then (  // then的規範 第一個function是成功, 第二個function是失敗
//     (result) => {
//         console.log('resolve函式被呼叫', result);
//     },
//     (error) => {
//         console.log('reject函式被呼叫', error);
//     }
// );


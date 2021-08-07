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

let dailyWork = async () => {  // let 變數 = async () 匿名函式
    // await會等到 Promise 的狀態是 fulfilled 才執行
    try {
        let job1 = await doWork('刷牙', 3000, true);
        console.log(job1);
    } catch (e) {
        console.error(e);
    }
    try {
        let job2 = await doWork('洗臉', 2000, true);
        console.log(job2);
        let job3 = await doWork('吃早餐', 3000, false);
        console.log(job3);
        let job4 = await doWork('運動', 4000, true);
        console.log(job4);
        let job5 = await doWork('上課', 2000, true);
        console.log(job5);
    } catch (e) {
        console.error(e);
    }
}
dailyWork();

let doWork = function (job, timer, isOK) {
    // 用 promise 取代 callback
    // 參數 isOK 用來設定成功或失敗條件
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
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
let job2 = doWork('洗臉', 3000, true);
let job3 = doWork('吃早餐', 5000, true);

job1.then (
    function(resolve) {
        console.log('刷牙', resolve);
    },
    function (reject) {
        console.log('刷牙', reject);
    }
);
job2.then (
    function(resolve) {
        console.log('洗臉', resolve);
    },
    function (reject) {
        console.log('洗臉', reject);
    }
);

// doWork('洗臉', 5000, resolve) {

// }

// doWork('吃早餐', 5000, resolve) {

// }

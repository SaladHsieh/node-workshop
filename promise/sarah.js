let job1 = new Promise((resolve, reject) => {
    console.log("123");
    setTimeout(() => {
        resolve("工作做完了");
    }, 3000);
});
console.log("setTimeout job1: ", job1);

//  class      instance
// Promise => new Promise()
// Promise.resolve() ==> 回傳一個 Promise 物件，而且是立刻 resolve
// Promise.reject()
let test = Promise.resolve(1);
console.log("test: ", test);

job1.then((result) => {
    console.log("result", result);
    // 1. 沒有寫 return
    // return Promise.resolve();
    // 2. return 1 (其他不是 promise 物件的東西)
    // return Promise.resolve(1);
    // 3. return promise 物件
})
    .then((result) => {
        console.log("result", result);
        // return Promise.resolve();
    })
    .catch((e) => {
        console.error(e);
    });

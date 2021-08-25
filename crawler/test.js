function build(data) {
    return new Promise((resolve, reject) => {
        data.map((item) => {
            console.log("in promise");
            console.log("before resolve");
            resolve(item * 2);
        });
    });
}
console.log("456");

(async () => {
    let result = await build([1, 3, 5]);
    console.log(result);
    console.log("******");
})();

// let result1 = build([1, 3, 5]);
// console.log('result1', result1);
// console.log("******");

console.log("789");

// 直接執行 async函式
// item 1 -> 印出 in promise, before resolve
// item 3 -> 印出 in promise, before resolve
// item 5 -> 印出 in promise, before resolve
// resolve()函式用來處理"最終完成"的結果所以會等1.3.5
// await暫停直到resolve取得最終完成結果後回傳, 因為Promise最終結果只有一個,所以取得resolve(1*2)就結束了

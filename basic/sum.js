console.log('Hello World');

// Ｏ(1) bigＯ(1)表示執行的速度跟n大小無關
// 一行程式碼可以解決
const sum1 = (n) => {
  return ((n + 1) * n) / 2;
};

// Ｏ(n) bigＯ(n)表示n越大執行速度越久
const sum2 = (n) => {
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += i;
  }
  return result;
};

// console.log(sum1(1), sum2(1));
// console.log(sum1(2), sum2(2));
// console.log(sum1(10), sum2(10));

// 效能測試
console.time('sum1');
for (let i = 1; i <= 10000; i++) {
  sum1(1000);
}
console.timeEnd('sum1');

console.time('sum2');
for (let i = 1; i <= 10000; i++) {
  sum2(1000);
}
console.timeEnd('sum2');

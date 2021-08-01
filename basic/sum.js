console.log("Hello World");

// Ｏ(1) bigＯ(1)表示執行的速度跟n大小無關
// 一行程式碼可以解決
sum1 = (n) => {
  return ((n + 1) * n) / 2;
};

// Ｏ(n) bigＯ(n)表示n越大執行速度越久
sum = (n) => {
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += i;
  }
  return result;
};

console.log(sum(1), sum1(1));
console.log(sum(2), sum1(2));
console.log(sum(10), sum1(10));

function double(i) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i * 2);
        // console.log(i);
      }, i * 1000);
    });
  }

  let data2 = [1, 2, 3, 4];
  data2 = data2.map(async (d) => {
    let result = await double(d);
    return result;
  });
  console.log("test 2: ", data2);
data2.map(d => {
    d.then((result) => {
        console.log(result);
    })
})

// 高階函式 吃一個函式的函式只要是可以接收函式作為參數，或是回傳函式作為輸出的函式，我們就稱為高階函式
// 非異步 -> 同步
// 非同步 -> 異步

// A:1234
// B:2468
// C 以上皆非

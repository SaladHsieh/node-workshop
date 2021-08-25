function double(i) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i * 2);
        // console.log(i);
      }, i * 1000);
    });
  }

  (async () => {
    let data1 = [1, 2, 3, 4];
    for (let i = 0; i < data1.length; i++) {
      data1[i] = await double(data1[i]);
    }
    console.log("test 1: ", data1);
  })();

// 高階函式 吃一個函式的函式只要是可以接收函式作為參數，或是回傳函式作為輸出的函式，我們就稱為高階函式
// 非異步 -> 同步
// 非同步 -> 異步

// A:1234
// B:2468
// C 以上皆非





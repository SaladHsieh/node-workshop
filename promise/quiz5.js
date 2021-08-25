function double(i) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i * 2);
        console.log(i);
      }, i * 1000);
    });
  }

let data3 = [1, 2, 3, 4];
data3.forEach(async (d, i) => {
  data3[i] = await double(d);
});
console.log("test 3: ", data3);

// A:1234
// B:2468
// C 以上皆非
async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);  // await的關係執行完setTimeout 才會接著印出3
}

console.log(4);
asyncF();
console.log(5);

// 執行順序 4 - () 1 - 5 - 2 - 3 ()
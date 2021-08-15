const cake = require("./cake"); // 引用模組

console.log(cake); // 印出整個cake module.exports

cake.setBaker("John");
console.log(cake.showBaker());
console.log(cake.showCake());
console.log(cake.showFlavor());
console.log(cake.showTaste());

console.log("Hello World")

sum = (n) => {
    let result = 0;
    for (let i = 0; i <=n; i++){
        result += i;
    }
    return result;
}

console.log(sum(1));
console.log(sum(2));
console.log(sum(10));
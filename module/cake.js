// 創模組時 JS 都會幫模組建一個空物件，並讓exports、module.exports指向這個物件 exports = module.exports = {};

let cake = "chiffon";
let flavor = "chocolate";
let taste = "Good";
let baker = "";

function setBaker(name) {
    baker = name;
}

function showCake() {
    return cake;
}

function showFlavor() {
    return flavor;
}

function showTaste() {
    return taste;
}

function showBaker() {
    return baker;
}

// exports = module.exports = {};
// 透過exports匯出這四個函式
// 寫法(一) 用export.屬性 = 函式，可以修改到原生物件
// exports.setBaker = setBaker;
// exports.showBaker = showBaker;
// exports.showCake = showCake;
// exports.showFlavor = showFlavor;
// exports.showTaste = showTaste;

// 寫法(二)
module.exports = {
    setBaker,
    showBaker,
    showCake,
    showFlavor,
    showTaste,
};

// **錯誤寫法**
// 會創造出一個新物件，而module.exports此時還是指向一個"空物件"
// exports = {
//     setBaker,
//     showBaker;
//     showCake,
//     showFlavor,
//     showTaste,
// };

// 模組最後會return module.exports; (但看不到的)

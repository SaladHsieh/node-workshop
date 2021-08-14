let cake = "chiffon";
let flavor = "chocolate";
let taste = "Good";
let baker = "John";

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

module.exports = {
    showCake,
    showFlavor,
    showTaste,
};

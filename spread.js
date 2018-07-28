function sum() {
    let total = 0;

    for (let i in arguments) {
        total += arguments[i];
    }

    return total;
}

let params = [1, 2, 3, 4,12]
console.log(sum(...params));
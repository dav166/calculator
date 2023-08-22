function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero!";
    }
    return a / b;
}

// Testing in the browser's console
console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(2, 3)); // 6
console.log(divide(9, 3)); // 3
console.log(divide(9, 0)); // Error: Cannot divide by zero!
function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {
    if (b === 0) {return "Error: Cannot divide by zero!"};
    return a / b;
}

// Testing in the browser's console
console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(2, 3)); // 6
console.log(divide(9, 3)); // 3
console.log(divide(9, 0)); // Error: Cannot divide by zero!


// Variables for calculator operation
let firstNumber = null;
let operator = null;
let secondNumber = null;

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '-':
            return divide(a, b);
        default:
            return "Error: Invalid operator!";
    }
}

// Testing
console.log(operate('+', 5, 3)); // 8
console.log(operate('-, 10, 4')); // 6


// Function to update the display
function updateDisplay(value) {
    document.getElementById('display').innerHTML = value;
}

// Event listeners for number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.value;
        if(firstNumber === null) {
            firstNumber = value;
            updateDisplay(firstNumber);
        } else {
            secondNumber = value;
            updateDisplay(secondNumber);
        }
    });
});

// Event listeners for operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', (e) => {
        operator = e.target.value;
    });
});

// Event listener for equals button
document.getElementById('equals').addEventListener('click', () => {
    if (firstNumber !== null && operator !== null && secondNumber !== null) {
        const result = operate(operator, Number(firstNumber), Number(secondNumber));
        updateDisplay(result);
        firstNumber = result;
        operator = null;
        secondNumber= null;
    }
});

// Event listener for clear button
document.getElementById('clear').addEventListener('click', () => {
    firstNumber = null;
    operator = null;
    secondNumber = null;
    updateDisplay('0');
});
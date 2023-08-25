class Calculator {
    constructor() {
        this.firstNumber = null;
        this.operator = null;
        this.secondNumber = null;
        this.init();
    }

    init() {
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', (e) => this.handleNumberInput(e.target.value));
        });

        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', (e) => {
                this.operator = e.target.value;
            });
        });

        document.getElementById('equals').addEventListener('click', this.evaluate.bind(this));
        document.getElementById('clear').addEventListener('click', this.clear.bind(this));
        document.getElementById('decimal').addEventListener('click', this.handleDecimal.bind(this));
        document.getElementById('backspace').addEventListener('click', this.handleBackspace.bind(this));
        document.getElementById('percent').addEventListener('click', this.handlePercent.bind(this));
        document.addEventListener('keydown', this.handleKeyboardInput.bind(this));
    }

    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return b === 0 ? "Error: Cannot divide by zero!" : a / b; }

    operate(operator, a, b) {
        switch (operator) {
            case '+': return this.add(a, b);
            case '-': return this.subtract(a, b);
            case '*': return this.multiply(a, b);
            case '/': return this.divide(a, b);
            default: return "Error: Invalid operator!";
        }
    }

    updateDisplay(value) {
        document.getElementById('display').innerText = value;
    }

    handleNumberInput(value) {
        let currentNumber = this.operator === null ? this.firstNumber : this.secondNumber;
        currentNumber = (currentNumber === null || currentNumber === '0' ? '' : currentNumber) + value;
        this.updateDisplay(currentNumber);
    
        if (this.operator === null) {
            this.firstNumber = currentNumber;
        } else {
            this.secondNumber = currentNumber;
        }
    }

    handleBackspace() {
        if (this.secondNumber !== null) {
            this.secondNumber = this.secondNumber.slice(0, -1);
            this.updateDisplay(this.secondNumber);
        } else if (this.operator !== null) {
            this.operator = null;
        } else if (this.firstNumber !== null) {
            this.firstNumber = this.firstNumber.slice(0, -1);
            this.updateDisplay(this.firstNumber);
        }
    }

    handlePercent() {
        if (this.firstNumber !== null && this.secondNumber === null && this.operator === null) {
            this.firstNumber = String(Number(this.firstNumber) / 100);
            this.updateDisplay(this.firstNumber);
        } else if (this.secondNumber !== null) {
            this.secondNumber = String(Number(this.secondNumber) / 100);
            this.updateDisplay(this.secondNumber);
        }
    }

    evaluate() {
        if (this.firstNumber !== null && this.operator !== null && this.secondNumber !== null) {
            const result = this.operate(this.operator, Number(this.firstNumber), Number(this.secondNumber));
            this.updateDisplay(result);
            this.firstNumber = String(result);
            this.operator = null;
            this.secondNumber = null;
        }
    }    

    clear() {
        this.firstNumber = null;
        this.operator = null;
        this.secondNumber = null;
        this.updateDisplay('0');
    }

    handleDecimal() {
        if (this.operator === null) {
            if (!this.firstNumber.includes('.')) {
                this.handleNumberInput('.');
            }
        } else if (!this.secondNumber.includes('.')) {
            this.handleNumberInput('.');
        }
    }    

    handleKeyboardInput(e) {
        if ('0123456789'.includes(e.key)) this.handleNumberInput(e.key);
        if ('+-*/'.includes(e.key)) this.operator = e.key;
        if (e.key === '.') this.handleDecimal();
        if (e.key === 'Backspace') this.handleBackspace();
        if (e.key === 'Enter' || e.key === '=') document.getElementById('equals').click();
        if (e.key === 'Escape') document.getElementById('clear').click();
        if (e.key === '%') document.getElementById('percent').click();
    }    
}

const calculator = new Calculator();
document.getElementById('theme-switcher').addEventListener('click', () => {
    const body = document.body;
    const calculator = document.querySelector('.calculator');
    
    body.classList.toggle('dark-mode');
    calculator.classList.toggle('dark-mode');
})
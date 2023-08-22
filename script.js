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
  
  function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return "Error: Invalid operator!";
    }
  }
  
  let firstNumber = null;
  let operator = null;
  let secondNumber = null;
  
  function updateDisplay(value) {
    document.getElementById('display').innerText = value;
  }
  
  function handleNumberInput(value) {
    if (operator === null) {
      firstNumber = (firstNumber || '0') + value;
      updateDisplay(firstNumber);
    } else {
      secondNumber = (secondNumber || '0') + value;
      updateDisplay(secondNumber);
    }
  }
  
  function handleBackspace() {
    if (secondNumber !== null) {
      secondNumber = secondNumber.slice(0, -1);
      updateDisplay(secondNumber);
    } else if (operator !== null) {
      operator = null;
    } else if (firstNumber !== null) {
      firstNumber = firstNumber.slice(0, -1);
      updateDisplay(firstNumber);
    }
  }
  
  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', (e) => handleNumberInput(e.target.value));
  });
  
  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', (e) => {
      operator = e.target.value;
    });
  });
  
  document.getElementById('equals').addEventListener('click', () => {
    if (firstNumber !== null && operator !== null && secondNumber !== null) {
      const result = operate(operator, Number(firstNumber), Number(secondNumber));
      updateDisplay(result);
      firstNumber = result;
      operator = null;
      secondNumber = null;
    }
  });
  
  document.getElementById('clear').addEventListener('click', () => {
    firstNumber = null;
    operator = null;
    secondNumber = null;
    updateDisplay('0');
  });
  
  document.getElementById('decimal').addEventListener('click', () => {
    if (operator === null && !firstNumber.includes('.')) {
      handleNumberInput('.');
    } else if (!secondNumber.includes('.')) {
      handleNumberInput('.');
    }
  });
  
  document.getElementById('backspace').addEventListener('click', handleBackspace);
  
  document.addEventListener('keydown', (e) => {
    if ('0123456789'.includes(e.key)) handleNumberInput(e.key);
    if ('+-*/'.includes(e.key)) operator = e.key;
    if (e.key === '.') document.getElementById('decimal').click();
    if (e.key === 'Backspace') document.getElementById('backspace').click();
    if (e.key === 'Enter' || e.key === '=') document.getElementById('equals').click();
    if (e.key === 'Escape') document.getElementById('clear').click();
  });
  
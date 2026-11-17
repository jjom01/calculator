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
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

// The calculator's memory
let firstNumber = 0;
let operator;
let secondNumber;
let justCalculated = false;

// Things on the page
const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

function updateDisplay() {
  if (operator !== undefined && secondNumber !== undefined) {
    display.textContent = secondNumber;
  } else {
    display.textContent = firstNumber;
  }
}

function addDigit(digit) {
  if (operator === undefined) {
    // After a result, a new digit starts a new number
    if (justCalculated) {
      firstNumber = 0;
      justCalculated = false;
    }
    firstNumber = firstNumber * 10 + digit;
  } else {
    secondNumber = (secondNumber || 0) * 10 + digit;
  }
  updateDisplay();
}

function setOperator(newOperator) {
  // If both numbers are in, finish that pair first (does nothing otherwise)
  calculate();
  operator = newOperator;
  secondNumber = undefined;
  justCalculated = false;
}

function calculate() {
  if (operator === undefined || secondNumber === undefined) {
    return;
  }
  if (operator === "/" && secondNumber === 0) {
    alert("Nice try! You can't divide by zero.");
    clearAll();
    return;
  }
  const result = operate(operator, firstNumber, secondNumber);
  // Round long decimals so they fit on the display
  firstNumber = Math.round(result * 1000000) / 1000000;
  operator = undefined;
  secondNumber = undefined;
  justCalculated = true;
  updateDisplay();
}

function clearAll() {
  firstNumber = 0;
  operator = undefined;
  secondNumber = undefined;
  justCalculated = false;
  updateDisplay();
}

// Button clicks
for (const button of digitButtons) {
  button.addEventListener("click", () => addDigit(Number(button.textContent)));
}

for (const button of operatorButtons) {
  button.addEventListener("click", () => setOperator(button.textContent));
}

equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearAll);

updateDisplay();

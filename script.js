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

let firstNumber = 0;
let operator;
let secondNumber;
let justCalculated = false;

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");

function updateDisplay() {
  if (operator !== undefined && secondNumber !== undefined) {
    display.textContent = secondNumber;
  } else {
    display.textContent = firstNumber;
  }
}

function addDigit(digit) {
  if (operator === undefined) {
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
  operator = newOperator;
  secondNumber = undefined;
  justCalculated = false;
}

function calculate() {
  if (operator === undefined || secondNumber === undefined) {
    return;
  }
  firstNumber = operate(operator, firstNumber, secondNumber);
  operator = undefined;
  secondNumber = undefined;
  justCalculated = true;
  updateDisplay();
}

digitButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    addDigit(Number(button.textContent));
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setOperator(button.textContent);
  });
});

equalsButton.addEventListener("click", calculate);

updateDisplay();

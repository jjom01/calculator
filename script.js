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
let entry = ""; // the number being typed, as text (so "12." can exist)

// Things on the page
const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

// Round only what we show, so the stored number keeps full precision
function roundForDisplay(number) {
  return Math.round(number * 1000) / 1000;
}

function updateDisplay() {
  if (entry !== "") {
    display.textContent = entry;
  } else {
    display.textContent = roundForDisplay(firstNumber);
  }
  // Only one decimal point per number
  decimalButton.disabled = entry.includes(".");
}

// Save what was typed into the first or second number
function saveEntry() {
  if (operator === undefined) {
    firstNumber = Number(entry);
  } else {
    secondNumber = Number(entry);
  }
  updateDisplay();
}

function addDigit(digit) {
  // No leading zeros
  if (entry === "0") {
    entry = "";
  }
  entry = entry + digit;
  saveEntry();
}

function addDecimal() {
  if (entry.includes(".")) {
    return;
  }
  if (entry === "") {
    entry = "0";
  }
  entry = entry + ".";
  saveEntry();
}

function setOperator(newOperator) {
  // If both numbers are in, finish that pair first (does nothing otherwise)
  calculate();
  operator = newOperator;
  secondNumber = undefined;
  entry = "";
  updateDisplay();
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
  firstNumber = operate(operator, firstNumber, secondNumber);
  operator = undefined;
  secondNumber = undefined;
  entry = "";
  updateDisplay();
}

function clearAll() {
  firstNumber = 0;
  operator = undefined;
  secondNumber = undefined;
  entry = "";
  updateDisplay();
}

// Button clicks
for (const button of digitButtons) {
  button.addEventListener("click", () => addDigit(button.textContent));
}

for (const button of operatorButtons) {
  button.addEventListener("click", () => setOperator(button.textContent));
}

decimalButton.addEventListener("click", addDecimal);
equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearAll);

updateDisplay();

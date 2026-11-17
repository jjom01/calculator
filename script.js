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

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");

function updateDisplay() {
  display.textContent = firstNumber;
}

function addDigit(digit) {
  firstNumber = firstNumber * 10 + digit;
  updateDisplay();
}

digitButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    addDigit(Number(button.textContent));
  });
});

updateDisplay();

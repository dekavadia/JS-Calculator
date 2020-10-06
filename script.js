// Elements
var numbersEl = document.querySelectorAll('[data-number]');
var operationEl = document.querySelectorAll('[data-operation]');
var equalEl = document.querySelector('#equal');
var deleteEl = document.querySelector('#delete');
var allClearEl = document.querySelector('#allClear');
var prevDigitEl = document.querySelector('.prev-display');
var currDigitEl = document.querySelector('.curr-display');

// Calculator Object
var calcObj = {
  'prevDigitEl' : prevDigitEl,
  'currDigitEl' : currDigitEl,
  'currNumber' : '',
  'prevNumber' : '',
  'operation' : undefined
}

// All Clear
function calcClear() {
  calcObj.currNumber = '';
  calcObj.prevNumber = '';
  calcObj.operation = undefined;
}

// Delete Digit
function calcDeleteDigit() {
  calcObj.currNumber = calcObj.currNumber.toString().slice(0, -1);
}

// Number Append
function calcAppendNumber(number) {
  if (number === '.' && calcObj.currNumber.includes('.')) return;
  calcObj.currNumber = calcObj.currNumber.toString() + number.toString();
}

// Choose Operation
function calcChooseOperation(operation) {
  if (calcObj.currNumber === '') return;
  if (calcObj.prevNumber !== '') {
    calcCompute();
  }
  calcObj.operation = operation;
  calcObj.prevNumber = calcObj.currNumber;
  calcObj.currNumber = '';
}

// Calculation
function calcCompute() {
  var comp;
  var prev = parseFloat(calcObj.prevNumber);
  var curr = parseFloat(calcObj.currNumber);

  if (isNaN(prev) || isNaN(curr)) return;

  if(calcObj.operation == '+') {
    comp = prev + curr;
  } else if(calcObj.operation == '-') {
    comp = prev - curr;
  } else if(calcObj.operation == '*') {
    comp = prev * curr;
  } else if(calcObj.operation == '÷') {
    comp = prev / curr;
  } else {
    return;
  }

  calcObj.currNumber = comp;
  calcObj.operation = undefined;
  calcObj.prevNumber = '';
}

// Number Format
function calcGetDisplayNumber(number) {
  var strNum = number.toString();
  var intNum = parseFloat(strNum.split('.')[0]);
  var decNum = strNum.split('.')[1];
  var intDisplay;

  if (isNaN(intNum)) {
    intDisplay = '';
  } else {
    intDisplay = intNum.toLocaleString('en', { maximumFractionDigits: 0 });
  }

  if (decNum != null) {
    return `${intDisplay}.${decNum}`;
  } else {
    return intDisplay;
  }
}

// Display Update
function calcUpdateDisplay() {
  calcObj.currDigitEl.innerText = calcGetDisplayNumber(calcObj.currNumber);
  if (calcObj.operation != null) {
    calcObj.prevDigitEl.innerText = `${calcGetDisplayNumber(calcObj.prevNumber)} ${calcObj.operation}`;
  } else {
    calcObj.prevDigitEl.innerText = '';
  }
}

numbersEl.forEach(button => {
  button.addEventListener('click', () => {
    calcAppendNumber(button.innerText);
    calcUpdateDisplay();
  })
})

operationEl.forEach(button => {
  button.addEventListener('click', () => {
    calcChooseOperation(button.innerText);
    calcUpdateDisplay();
  })
})

equalEl.addEventListener('click', () => {
  calcCompute();
  calcUpdateDisplay();
})

allClearEl.addEventListener('click', () => {
  calcClear();
  calcUpdateDisplay();
})

deleteEl.addEventListener('click', () => {
  calcDeleteDigit();
  calcUpdateDisplay();
})

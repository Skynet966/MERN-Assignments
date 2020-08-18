"use strict"; //only allow local variable init
window.addEventListener('load', init); //load init function after page load
var operations, result, resultDisplayed = false,
	dot = true; //public scope variable declaration
function init() { //initlize the calculator buttons and display
	operations = document.querySelector('#operations');
	result = document.querySelector('#result');
	document.querySelector('#clear').addEventListener('click', clear);
	document.querySelector('#calculate').addEventListener('click', calculate);
	document.querySelector('#back').addEventListener('click', back);
	operators();
	numbers();
	console.log('Calculator initilize successfully ' + String.fromCharCode(9829));
}

function operators() {
	let x = document.querySelectorAll('.operators div');
	for (let i = 0; i < x.length; i++) {
		x[i].addEventListener('click', inputOperator);
	}
}

function numbers() {
	let x = document.querySelectorAll('.numbers div');
	for (let i = 0; i < x.length - 1; i++) {
		x[i].addEventListener('click', inputNumber);
	}
}

function back() {
	if (result.innerHTML[result.innerHTML.length - 1] === '.') {
		dot = true;
	}
	result.innerHTML = result.innerHTML.substring(0, result.innerHTML.length - 1);
}

function clear() { //clear output screen
	operations.innerHTML = '';
	result.innerHTML = '';
	dot = true;
	resultDisplayed = false;
}

function inputNumber() {
	let rslt = result.innerHTML;
	let input = this.innerHTML;
	if (rslt[1] === 'p') {
		clear();
	}
	if (resultDisplayed) {
		operations.innerHTML += result.innerHTML;
		result.innerHTML = '';
		resultDisplayed = false;
	}
	if (input > 0 && input <= 9 && rslt == 0 && dot) {
		result.innerHTML = input;
	}
	else if (input > 0 && input <= 9 && rslt[rslt.length - 1] == 0 && isNaN(parseInt(rslt[rslt.length - 2]))) {
		result.innerHTML = rslt.substring(0, rslt.length - 1) + input;
	}
	else if (input > 0 && input <= 9) {
		result.innerHTML += input;
	}
	else if (input == 0 && rslt[rslt.length - 1] == 0 && isNaN(parseInt(rslt[rslt.length - 2])) && dot) {}
	else if (input == 0 && rslt[0] == 0 && dot) {
		result.innerHTML += input;
	}
	else if (input == 0 && rslt == 0 && dot) {
		result.innerHTML = input;
	}
	else if (input == 0 && rslt == 0) {
		result.innerHTML += input;
	}
	else if (isNaN(parseInt(rslt[rslt.length - 1])) && input === '.' && dot) {
		result.innerHTML += '0' + input;
		dot = false;
	}
	else if (rslt == 0 && input === '.' && dot) {
		result.innerHTML = '0' + input;
		dot = false;
	}
	else if (input === '.' && dot) {
		result.innerHTML += input;
		dot = false;
	}
	else if (input !== '.') {
		result.innerHTML += input;
	}
}

function inputOperator() {
	let rslt = result.innerHTML;
	let lastChar = rslt[rslt.length - 1];
	if (rslt == 0 && !isNaN(parseInt(lastChar))) {
		result.innerHTML = "<p style='font-size:1rem;'>Enter a value that is greater than 0</p>";
	}
	else if (rslt !== '' && isNaN(parseInt(lastChar)) && lastChar !== '.') {
		result.innerHTML = result.innerHTML.substring(0, rslt.length - 1) + this.innerHTML;
	}
	else if (rslt !== '' && lastChar !== '.') {
		result.innerHTML += this.innerHTML;
	}
	else {
		result.innerHTML = "<p style='font-size:1rem;'>Please enter a number first!</p>"
	}
	dot = true;
	resultDisplayed = false;
}

function calculate() {
	var inputString = result.innerHTML;
	if (inputString === "")
		return;
	var numbers = inputString.split(/\+|\-|\×|\÷/g);
	var operators = inputString.replace(/[0-9]|\./g, "").split("");
	var divide = operators.indexOf("÷");
	while (divide != -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
		operators.splice(divide, 1);
		divide = operators.indexOf("÷");
	}

	var multiply = operators.indexOf("×");
	while (multiply != -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf("×");
	}

	var subtract = operators.indexOf("-");
	while (subtract != -1) {
		numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
		operators.splice(subtract, 1);
		subtract = operators.indexOf("-");
	}

	var add = operators.indexOf("+");
	while (add != -1) {
		numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
		operators.splice(add, 1);
		add = operators.indexOf("+");
	}
	operations.innerHTML = result.innerHTML + "=";
	result.innerHTML = numbers[0];
	dot = true;
	resultDisplayed = true;
}
let log = console.log;

// function add
function add(num1, num2) {
    return num1 + num2;
}

// function subtract
function subtract(num1, num2) {
    return num1 - num2;
}

// function multiply
function multiply(num1, num2) {
    return num1 * num2;
}

// function divide
function divide(num1, num2) {
    return num1 / num2;
}

let operandOne = 0;
let operandTwo = 0;
let operator = "";

// function operate
function operate(oper1, oper2, operator) {
    if(operator === '+') {
        return add(oper1, oper2);
    } //end add
    if(operator === '-') {
        return subtract(oper1, oper2);
    }
    if(operator === '*') {
        return multiply(oper1, oper2);
    }
    if(operator === '/') {
        return divide(oper1, oper2);
    }
} //end function operate

let para = document.querySelector('.output');


// const seven = document.querySelector('.btn7');
// const eight = document.querySelector('.btn8');
// const nine = document.querySelector('.btn9');
// const  = document.querySelector('.btn+');
// const seven = document.querySelector('.btn4');
// const seven = document.querySelector('.btn5');
// const seven = document.querySelector('.btn6');
// const seven = document.querySelector('.btn-');
// const seven = document.querySelector('.btn1');
// const seven = document.querySelector('.btn2');
// const seven = document.querySelector('.btn3');
// const seven = document.querySelector('.btn*');
// const seven = document.querySelector('.btnC');
// const seven = document.querySelector('.btn0');
// const seven = document.querySelector('.btn.');
// const seven = document.querySelector('.btn/');

const buttonArray = document.querySelectorAll('.btn');
buttonArray.forEach((item) => {
    item.addEventListener('click', () => {
        para.textContent = item.textContent;
    });
})







seven.addEventListener('click', () => {
    para.textContent = '7';
});

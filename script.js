// universal variable declarations
let log = console.log;
let operand_one = 0;
let operand_two = 0;
let operator = "";
let result = 0;
let para = document.querySelector('.output');
let needsCleared = true;
let asFirstOperator = true;
let operatorToUse = '';
let resultExists = false;

function resetValues() {
    operand_one = 0;
    operand_two = 0;
    operator = "";
    result = 0;
    para.textContent = "0";
    asFirstOperator = true;
    dot.disabled = false;
    needsCleared = true;
    resultExists = false;
}

// individual arithmetic functions-------------------------------------------------------------
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// function operate
function operate(oper1, oper2, operator) {
    
    oper1 = Number(oper1);
    oper2 = Number(oper2);
    resultExists = true;
    needsCleared = true;

    if(operator === '+') {
        return add(oper1, oper2);
    }
    if(operator === '-') {
        return subtract(oper1, oper2);
    }
    if(operator === '*') {
        return multiply(oper1, oper2);
    }
    if(operator === '/') {
        if(oper2 === 0) {
            resetValues();
            para.textContent = 'ERROR';
        }
        else {
            return divide(oper1, oper2);
        }
    }

} //end function operate

// number buttons
const buttonArray = document.querySelectorAll('.btn-digit');
buttonArray.forEach((button) => {
    button.addEventListener('click', () => {
        //removes leading 0 so it's not a part of operand
        if(needsCleared) {
            para.textContent = '';
            para.textContent = button.textContent;
            needsCleared = false;
        }
        else {
            para.textContent += button.textContent;
        }
        
    });
    
}); //end section on adding event listeners to numbers/digits

// equal button section
const equalBtn = document.querySelector('#equalBtn');
equalBtn.addEventListener('click', () => {
    operand_two = para.textContent;
    log(`op-one: ${operand_one} op-two: ${operand_two} operator: ${operator}`);
    result = parseFloat(operate(operand_one, operand_two, operator).toFixed(3));
    para.textContent = result;
    operand_one = result;
    operand_two = 0;
    operator = "";
    asFirstOperator = true;
    log(`op-one: ${operand_one} op-two: ${operand_two} operator: ${operator}`);
});

// operator button section (+ = * /)
const operatorArray = document.querySelectorAll('.btn-operator');
operatorArray.forEach((button) => {
    button.addEventListener('click', () => {

        dot.disabled = false;
        operator = button.textContent;

        if(asFirstOperator) {
            operand_one = para.textContent;
            para.textContent = button.textContent;
            operatorToUse = operator;
            asFirstOperator = false;
        }
        
        else if(!asFirstOperator) {
            operand_two = para.textContent;
            result = parseFloat(operate(operand_one, operand_two, operatorToUse).toFixed(3));
            para.textContent = result;
            operand_one = result;
            operand_two = 0;
            operatorToUse = operator;
        }

        needsCleared = true;
    });
});

// clear button section
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    resetValues();
});

// backSpace/backArrow button section
let backSpace = '';

const backArrow = document.querySelector('#back-arrow');
backArrow.addEventListener('click', () => {
    backSpace = para.textContent;
    backSpace = backSpace.slice(0, -1);
    para.textContent = backSpace;
    if(para.textContent === '') {
        resetValues();
    }
});

// dot/period button section
const dot = document.querySelector(`#dot`);
dot.addEventListener('click', () => {
    para.textContent += dot.textContent;
    dot.disabled = true;
});





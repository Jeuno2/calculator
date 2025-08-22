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
let backSpace = '';

function resetValues() {
    operand_one = 0;
    operand_two = 0;
    operator = "";
    result = 0;
    para.textContent = "0";
    needsCleared = true;
    asFirstOperator = true;
    dot.disabled = false;
    operatorToUse = '';
    resultExists = false;
}

// input numbers/digits function
// function inputNumbers() {
//     //removes leading 0 so it's not a part of operand
//     if(needsCleared) {
//         para.textContent = '';
//         para.textContent = button.textContent;
//         needsCleared = false;
//     }
//     else {
//         para.textContent += button.textContent;
//     }

//     for(let i = 0; i < operatorArray.length; i++) {
//         operatorArray[i].disabled = false;
//     }
// }

// backspace (back-arrow) function
function backspace() {
    const dotToRemove = para.textContent;
    backSpace = para.textContent;
    backSpace = backSpace.slice(0, -1);
    para.textContent = backSpace;
    if(dotToRemove.charAt(dotToRemove.length - 1) === '.') {
        log(dotToRemove.charAt(dotToRemove.length));
        dot.disabled = false;
    }
    if(para.textContent === '') {
        resetValues();
    }
}

function equals() {
    operand_two = para.textContent;
    result = parseFloat(operate(operand_one, operand_two, operator).toFixed(3));
    para.textContent = result;
    operand_one = result;
    operand_two = 0;
    operator = "";
    asFirstOperator = true;
    dot.disabled = false;
    for(let i = 0; i < operatorArray.length; i++) {
            operatorArray[i].disabled = false;
        }
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
    // dot.disabled = true;

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

        for(let i = 0; i < operatorArray.length; i++) {
            operatorArray[i].disabled = false;
        } 

    });
    
}); //end section on adding event listeners to numbers/digits

// equal button section
const equalBtn = document.querySelector('#equalBtn');
equalBtn.addEventListener('click', () => {
    equals();
});

// operator button section (+ = * /)
const operatorArray = document.querySelectorAll('.btn-operator');
operatorArray.forEach((button) => {
    button.addEventListener('click', () => {

        for(let i = 0; i < operatorArray.length; i++) {
            operatorArray[i].disabled = true;
        } 
        
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

const backArrow = document.querySelector('#back-arrow');
backArrow.addEventListener('click', () => {
    backspace();
});

// dot/period button section
const dot = document.querySelector(`#dot`);
dot.addEventListener('click', () => {
    dot.disabled = true;
    // if(para.textContent.includes('.')) {
    //     dot.disabled = true;
    //     log('happy feet');
    // }
    // else {
    //     dot.enabled = false;
    // }
    
    para.textContent += dot.textContent;
    // dot.disabled = true;
    needsCleared = false;
});

// regular expression-----------------------------------------------------------------------------------------------------
const numberRegex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorRegex = ['+', '-', '*', '/'];

// keyboard events/listeners section
document.addEventListener('keydown', (e) => {

    log(e.key);

    //backspace section
    if(e.key === 'Backspace') {
        backspace();
    }

    // clear section
    if(e.key === 'c' || e.key === 'C') {
        resetValues();
    }

    if(e.key === '.') {
        if(para.textContent.includes('.')) {
            e.preventDefault();
        } else {
            para.textContent += '.';
        }
    }

    // equals section
    if(e.key === '=' | e.key === 'Enter') {
        equals();
    }

    // numbers section
    for(let i = 0; i < numberRegex.length; i++) {
        if(numberRegex[i] === e.key) {
            if(needsCleared) {
                para.textContent = '';
                para.textContent = e.key;
                needsCleared = false;
            }
            else {
                para.textContent += e.key;
            }

            for(let i = 0; i < operatorArray.length; i++) {
                operatorArray[i].disabled = false;
            }
        }
        log(`actually here`);
    };

    // operators section
    
    if(e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
            dot.disabled = false;
            operator = e.key;

            if(asFirstOperator) {
                operand_one = para.textContent;
                para.textContent = e.key;
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

            for(let i = 0; i < operatorArray.length; i++) {
                operatorArray[i].disabled = true;
            } 
    }
});

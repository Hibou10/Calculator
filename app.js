let buffer = '0';
let runningTotal = 0;
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(number){
    if (buffer === '0'){           
        buffer = number;          // Wenn der Benutzer "5" eingibt und buffer ursprünglich '0' ist, wird buffer zu '5'
    }
    else{
        buffer = buffer + number;  // Wenn buffer '5' ist und der Benutzer "3" eingibt, wird buffer zu '53'
    }  
}

function handleMath(value){
    if (buffer === '0') {
        // do nothing
        return;
    }
 
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    
    previousOperator = value;
    buffer = '0';
    console.log(runningTotal);
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal = runningTotal + intBuffer;
    } else if (previousOperator === '-') {
        runningTotal = runningTotal - intBuffer;
    }  else if (previousOperator === 'x') {
        runningTotal = runningTotal * intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal = runningTotal / intBuffer;
    }
}

function handleSymbol(symbol){
    switch (symbol) {
        case 'C':
            buffer = '0';
            break;

        case '=':
            if (previousOperator === null) {
                //need do numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;

        case '⬅':
            if(buffer.length === 1){   // Wenn Buffer nur eine Ziffer enthält
                buffer = '0';         // buffer wird auf 0 gesetzt
            } else {
                buffer = buffer.substring(0, buffer.length - 1);     // Entfene die letzte Ziffer (0 start, buffer.length-1 is end)
            }
            break;  

        case '+':
        case '-':
        case '÷':
        case 'x':
            handleMath(symbol);
            break;   
    }
}

function init() {
    document
    .querySelector('.calc-buttons')
    .addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    });
}

function rerender(){
    screen.innerText = buffer;   // Setze den Textinhalt des Elements screen auf den Wert von buffer
}

init();


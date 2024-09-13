let buffer = '0';
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

function handleSymbol(symbol){
    switch (symbol) {
        case 'C':
            buffer = '0';
            console.log('clear');
            break;
        case '=':
            console.log('equals'); 
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
            console.log('math symbol');
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


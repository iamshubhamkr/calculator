const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach((number) => {
    number.addEventListener('click',(e)=>{
        if(e.target.innerText === '.' && !haveDot){ 
            // The target property returns the element that triggered the event, and not necessarily the eventlistener's element.
            haveDot = true;
        }
        else if (e.target.innerText === '.' && haveDot){
            return;
        }
        dis2Num += e.target.innerText;//concatenate number which got clicked ;
        display2El.innerText = dis2Num;//when number clicked it get displays;

    })
});

//  operation
operationEl.forEach((operation) => {
    operation.addEventListener('click',(e)=>{
        if(!dis2Num) result;//if user have not given any number and try to use operation button
        haveDot = false;//when we are taking second number to perform some operation
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation){
            mathOperation();
        }
        else {
            result = parseFloat(dis2Num);//converting string to number
        }
        clearVar(operationName);//this function will store temp result in temp display(bottom left)
        lastOperation = operationName;
        console.log(result);
    })
});

function clearVar(name = ''){
    dis1Num += dis2Num + ' ' + name + ' ';
    display1El.innerText = dis1Num;
    display2El.innerText = '';
    dis2Num = '';
    tempResultEl.innerText = result;
}

function mathOperation(){
    if (lastOperation === '*'){
        result = parseFloat(result) * parseFloat(dis2Num); 
    }
    else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num); 
    } else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num); 
    }
    else if(lastOperation === '/'){
        result = (parseFloat(result) / parseFloat(dis2Num)).toFixed(2); 
    }else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num); 
    }
}

equalEl.addEventListener('click',(e)=>{
    if(!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

clearAllEl.addEventListener('click',(e)=>{
    display1El.innerText = '0';
    display2El.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = '';
    tempResultEl.innerText = '0';
});

clearLastEl.addEventListener('click',(e)=>{
    display2El.innerText = '';
    dis2Num = '';
});

// adding keyboard addeventlistener
window.addEventListener('keydown',(e)=>{
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ){
        clickButtonEl(e.key);
    }else if(
        e.key === '*'||
        e.key === '/'||
        e.key === '%'||
        e.key === '+'||
        e.key === '-'
    ){
        clickOperation(e.key);
    }else if(e.key == 'Enter'||e.key === '='){
        clickEqual();
    }

});

function clickButtonEl(key){
    numbersEl.forEach((button)=>{
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickOperation(key){
    operationEl.forEach((button)=>{
        if(button.innerText === key){
            button.click();
        }
    })
}

function clickEqual(){
    equalEl.click();
}
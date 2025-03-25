const add = (n1, n2) => n1+n2;
const subtract = (n1,n2) =>n1-n2;
const divide = (n1,n2) => n1/n2;
const multiply = (n1,n2) => n1*n2;

const operate =  function (n1, o, n2) {
    switch(o){
        case '+':
            return add(n1,n2);
        case '-':
            return subtract(n1,n2);
        case '*':
            return multiply(n1,n2);
        case '/':
            return divide(n1,n2);
        case '=':
            return n1;
        default:
            console.log("error");
    }
}
let buttons = "C +/- <- / 7 8 9 * 4 5 6 - 1 2 3 + 0 . =".split(" ");
const container = document.querySelector(".container");
const display = document.querySelector(".display");
let n1 = oe = 0;
let n2 = o = undefined;
let floatCheck = false;

let backspace = function(n) {
    n = (n+"").slice(0, n.length - 1);
    if(n === '')
        n = 0;
    return n;
}
let negate = function(n) {
    if((n+"")[0] !== '-' && n != 0)
        n = '-' + n;
    else{
        if(n != 0)
            n = (n+"").slice(1);
    }
    return n;
}

let float = function(n) {
        if(floatCheck || !Number.isInteger(+n))
            return n;
        floatCheck = true;
        n += '.';
        return n;
}


for(let i = 0; i<5; i++) {
    const row = document.createElement("div")
    row.setAttribute("class", "row")
    for(let j=i*4,c=0; j < buttons.length && c<4;j++,c++){
        const btn = document.createElement("button");
        if(Number.isInteger(+buttons[j]) || "+/- <- .".split(" ").includes(buttons[j])){
            //btn.setAttribute("id", "num");
            btn.addEventListener("click", (e) =>{
                if(o === undefined || oe){
                    switch(buttons[j]){
                        case '<-':
                            if(oe)
                                break;
                            n1 = backspace(n1);
                            break;
                        case '+/-':
                            n1 = negate(n1);
                            break;
                        case '.':
                            if(oe) {
                                n1 = float(0);
                                oe += 1;
                                break;
                            }
                            n1 = float(n1);
                            break;
                
                        default:
                            if((!floatCheck && n1 == 0)|| oe == 1) {
                                n1 = buttons[j];
                                if(oe)
                                    oe += 1;
                            }
                            else {
                                n1 += buttons[j];
                            }     
                    } 
                    display.textContent = n1;
                }
                else{
                    switch(buttons[j]){
                        case '<-':
                            if(n2 === undefined) {
                                display.textContent = n1;
                                return;
                            }
                            n2 = backspace(n2);
                            break;

                        case '+/-':
                            if(n2 === undefined) {
                                n2 = negate(n1);
                                break;
                            }
                                n2 = negate(n2);
                                break;
                        
                        case '.':
                            if(n2 === undefined) {
                                n2 = float(0);
                                break;
                            }
                            n2 = float(n2);
                            break;

                        default:
                            if(n2 === undefined || (!floatCheck && n2 == 0)){
                                n2 = buttons[j];
                            }
                            else {
                                n2 += buttons[j];
                            }
                    }
                    display.textContent = n2;
                    
                }
            })
        }
        else{
            btn.setAttribute("id", buttons[j]);
            btn.addEventListener("click", (e) =>{
                switch(buttons[j]){
                    case 'C':
                        n1 = oe =0;
                        n2 = o = undefined;
                        floatCheck = false;
                        break;

                    default:
                        if(n2 !== undefined) {
                            if(buttons[j] === '='){
                                oe = 1;
                                n1 = operate(+n1, o, +n2);
                            }
                            else{
                                if(!oe)
                                    n1 = operate(+n1, o, +n2);
                                n2 = undefined;
                                oe = 0;
                            } 
                        }
                        if(buttons[j] !== '=')
                            o = buttons[j];
                }
                floatCheck = false;
                if(n1 == Infinity || isNaN(n1))  {
                    display.textContent = "Error";
                    n1 = oe = 0;
                    n2 = o = undefined;
                    floatCheck = false;
                    return;
                }
                display.textContent = n1;

            })
            
        }
            
        btn.textContent = buttons[j];


        row.appendChild(btn)
    }
    container.appendChild(row)

}


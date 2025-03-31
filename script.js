// equate bug with keyboard after clear/floating point
// number out of container

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
const container = document.querySelector("#container");
const display = document.querySelector(".display");
let n1 = oe = 0;
let n2 = o = undefined;
let floatCheck = false;

let backspace = function(n) {
    if((n+"")[n.length - 1] == '.')
        floatCheck = false;
    n = (n+"").slice(0, n.length - 1);
    if(n === '' || n === '-')
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
        if(floatCheck || (!Number.isInteger(+n)) )
            return n;
        floatCheck = true;
        n += '.';
        return n;
}

let untoggle_operator = () => {
    let a = document.getElementsByClassName("operator_click"); 
    for(let i = 0; i<a.length; i++) {
        a[i].classList.remove("operator_click");
    }
}

let w = document.getElementById("container").offsetWidth;
let h = document.getElementById("container").offsetHeight;
display.setAttribute("style", ` width:${w}px; height:${h*2/5}px`);
let wd = display.offsetWidth;

for(let i = 0; i<5; i++) {
    const row = document.createElement("div")
    row.setAttribute("class", "row")
    for(let j=i*4,c=0; j < buttons.length && c<4;j++,c++){
        const btn = document.createElement("button");
        btn.setAttribute("id", buttons[j]);
        if(Number.isInteger(+buttons[j]) || "+/- <- . C".split(" ").includes(buttons[j])){
            
            if(Number.isInteger(+buttons[j]) || buttons[j] == ".") {
                btn.setAttribute("class","num");
                btn.addEventListener("mouseover", (e) =>{
                    e.target.classList.toggle("num_hover");
                });
                btn.addEventListener("mouseout", (e) =>{
                    e.target.classList.toggle("num_hover");
                });
            }  
            else {
                btn.setAttribute("class","symbol");
                btn.addEventListener("mouseover", (e) =>{
                    e.target.classList.toggle("symbol_hover");
                });
                btn.addEventListener("mouseout", (e) =>{
                    e.target.classList.toggle("symbol_hover");
                });
            }
                

            btn.addEventListener("click", (e) =>{
                if(buttons[j] == 'C') {
                    n1 = oe = 0;
                    n2 = o = undefined;
                    floatCheck = false;
                    display.textContent = n1;
                    untoggle_operator();
                    return;
                }
                if(o === undefined || oe){
                    switch(buttons[j]){
                        case '<-':
                            if(oe == 1)
                                break;
                            n1 = backspace(n1);
                            break;
                        case '+/-':
                            n1 = negate(n1);
                            break;
                        case '.':
                            if((n1+"").length < 9 ) {
                                if(oe == 1) {
                                    n1 = float(0);
                                    oe += 1;
                                    break;
                                }
                                n1 = float(n1);
                            }
                            break;
                
                        default:
                            if((!floatCheck && n1 == 0)|| oe == 1) {
                                n1 = buttons[j];
                                if(oe)
                                    oe += 1;
                            }
                            else {
                                if((n1+"").length < 9 || (floatCheck && (n1+"").length < 10))
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
                            if((n2+"").length < 9 ) {
                                if(n2 === undefined) {
                                    n2 = float(0);
                                    break;
                                }
                                n2 = float(n2);
                            }
                            break;

                        default:
                            if(n2 === undefined || (!floatCheck && n2 == 0)){
                                n2 = buttons[j];
                            }
                            else {
                                if((n2+"").length < 9 || (floatCheck && (n2+"").length < 10))
                                    n2 += buttons[j];
                            }
                    }
                    display.textContent = n2;
                }
                untoggle_operator();
            })
        }
        else{
            btn.setAttribute("class","operator");
            btn.addEventListener("mouseover", (e) =>{
                e.target.classList.toggle("operator_hover");
            });
            btn.addEventListener("mouseout", (e) =>{
                e.target.classList.toggle("operator_hover");
            });
            btn.addEventListener("click", (e) =>{
                untoggle_operator();
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
                } else if(buttons[j] === '=' && o !== undefined) {
                    oe = 1;
                    n2 = n1;
                    n1 = operate(+n1, o, +n2);
                }

                if(buttons[j] !== '=') {
                    e.target.classList.toggle("operator_click");
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
                else if(!Number.isInteger(+n1)){
                    display.textContent = parseFloat((+n1).toPrecision(9));
                }
                else 
                    display.textContent = n1;
            })
        }
        btn.textContent = buttons[j];
        if(buttons[j] == '0')
            btn.setAttribute("style", ` width:${wd/ 2}px; height:${h*3/25}px`);
        else
            btn.setAttribute("style", ` width:${wd / 4}px; height:${h*3/25}px`);
        row.setAttribute("style", ` width: ${wd}px; height:${h*3/25}px;`)
        row.appendChild(btn)
    }
    container.appendChild(row)
}

window.addEventListener("keydown", (e) => {
    let element = null;
    switch(e.key){
        case "Backspace":
            element = document.getElementById("<-");
            break;
        case "Enter":
            element = document.getElementById("=");
            break;
        default:
            if(document.getElementById(e.key) !== null)
                element = document.getElementById(e.key);
        }
        
        if(element !== null) {
            element.click();
            console.log(element.classList);
            element.classList.toggle(`${element.classList[0]}_hover`);
            console.log(element.classList);
        }

})

window.addEventListener("keyup", (e) => {
    let element = null;
    switch(e.key){
        case "Backspace":
            element = document.getElementById("<-");
            break;
        case "Enter":
            element = document.getElementById("=");
            break;
        default:
            if(document.getElementById(e.key) !== null)
                element = document.getElementById(e.key);
        }
        
        if(element !== null) {
            element.classList.toggle(`${element.classList[0]}_hover`);
        }
    
})


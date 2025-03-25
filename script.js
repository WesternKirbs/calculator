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
let n1 = 0;
let n2 = o = undefined;
let oe = 0;
for(let i = 0; i<5; i++) {
    const row = document.createElement("div")
    row.setAttribute("class", "row")
    for(let j=i*4,c=0; j < buttons.length && c<4;j++,c++){
        const btn = document.createElement("button");
        if(Number.isInteger(+buttons[j])){
            btn.setAttribute("id", "num");
            btn.addEventListener("click", (e) =>{
                if(o === undefined || oe){
                    if(n1 == 0 || oe == 1) {
                        n1 = buttons[j];
                        if(oe)
                            oe += 1;
                    }
                    else {
                        n1 += buttons[j];
                    }
                    display.textContent = n1;
                }
                else{
                    if(n2 === undefined || n2 == 0){
                        n2 = buttons[j];
                    }
                    else {
                        n2 += buttons[j];
                    }
                    display.textContent = n2;
                }
            })
        }
        else{
            btn.setAttribute("id", buttons[j]);
            btn.addEventListener("click", (e) =>{
                if(n2 !== undefined) {
                    if(buttons[j] === '='){
                        oe = 1;
                        n1 = operate(+n1, o, +n2);
                        display.textContent = n1;
                    }
                    else{
                        if(!oe)
                            n1 = operate(+n1, o, +n2);
                        n2 = undefined;
                        oe = 0;
                        display.textContent = n1;
                    } 
                }
                if(buttons[j] !== '=')
                    o = buttons[j];
            })
            
        }
            
        btn.textContent = buttons[j];


        row.appendChild(btn)
    }
    container.appendChild(row)

}


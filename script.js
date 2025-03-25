const add = (n1, n2) => n1+n2;

const subtract = (n1,n2) =>n1-n2;
const divide = (n1,n2) => n1/n2;
const multiply = (n1,n2) => n1*n2;

const operate =  function (n1, o, n2) {
    switch(o){
        case '+':
            add(n1,n2);
            break;
        case '-':
            subtract(n1,n2);
            break;
        case '*':
            multiply(n1,n2);
            break;
        case '/':
            divide(n1,n2);
            break;
        default:
            console.log("error");
    }
}
let buttons = "C +/- <- / 7 8 9 * 4 5 6 - 1 2 3 + 0 . =".split(" ");
const container = document.querySelector(".container");
const display = document.querySelector(".display");
let n1 = 0;
let n2 = o = undefined;
for(let i = 0; i<5; i++) {
    const row = document.createElement("div")
    row.setAttribute("class", "row")
    for(let j=i*4,c=0; j < buttons.length && c<4;j++,c++){
        const btn = document.createElement("button");
        if(Number.isInteger(+buttons[j])){
            btn.setAttribute("id", "num");
            btn.addEventListener("click", (e) =>{
                if(o === undefined){
                    if(n1 == 0) {
                        n1 = buttons[j];
                    }
                    else {
                        n1 += buttons[j];
                    }
                }
                display.textContent = n1;
            })

        }
        else{
            btn.setAttribute("id", buttons[j]);
        }
            
        btn.textContent = buttons[j];


        row.appendChild(btn)
    }
    container.appendChild(row)

}


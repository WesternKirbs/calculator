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
buttons.forEach((b) => {
    const btn = document.createElement("button");
    if(Number.isInteger(+b))
        btn.setAttribute("id", "num");
    else
        btn.setAttribute("id", b);
    btn.textContent = b;
    

})


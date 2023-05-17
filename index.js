// Click on 'Billy, sing!' button, Billy will sing, then a message will show a countdown to the player's turn.
let counter = 4;
function sayReady() {
    document.getElementById("countDown").innerHTML = "Ready?";
    setTimeout(() => {countDown()},1000);
}
function countDown(){
    id=setInterval(function() {
    counter--;
    if(counter < 1) {
        clearInterval(id);
        document.getElementById("countDown").innerHTML = "START!";
        setTimeout(() => {document.getElementById("countDown").innerHTML = "";},1000);
    } else {
        document.getElementById("countDown").innerHTML = "In..." + counter.toString();
    }
}, 1000);
};
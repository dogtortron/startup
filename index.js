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

// create an array for a song
// a function to generate a random array with value from 1 to 4, 
// let's make my life eaier to not do the time. If the player can generate the right sequence, that's good enough.

// function to test if the user got the right sequence of sound
let generatedSong;
let userSong;
function testUser(generatedSong,userSong) {
    if (JSON.stringify(generatedSong) === JSON.stringify(userSong)) {
        console.log("good job!")
    }
    else {
        console.log("try again!")
    };
}
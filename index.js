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
function testUser(generatedSong,userSong) {
    let generatedSong;
    let userSong;
    if (JSON.stringify(generatedSong) === JSON.stringify(userSong)) {
        console.log("good job!")
    }
    else {
        console.log("try again!")
    };
}

// function to measure how long a key was pressed
function keyPressedDuration() {
    let pressed = {};
    window.onkeydown = function(e) {
        if (pressed[e.code]) return;
        pressed[e.code] = e.timeStamp;
    };
    window.onkeyup = function(e) {
        if (!pressed[e.code]) return;
        let duration = (e.timeStamp - pressed[e.code])/1000;
        pressed[e.code] = 0;
        console.log('A key was pressed for ' + duration + ' seconds');
    };
};

// function to measure how long a button was pressed
function mousePressDuration() {
    let down;
    let duration = 0;
    function mousePressed() {
    down = Date.now();
    };
    function mouseReleased() {
    duration = (Date.now() - down)/1000;
    };
    const clicker = document.getElementById("clicker");
    clicker.addEventListener("mousedown", mousePressed);
    clicker.addEventListener("mouseup", function() {
    mouseReleased();
    console.log(`Time taken: ${duration}s`);
    });
};
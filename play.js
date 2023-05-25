const btnDescriptions = [
    { file: 'note1.mp3'},
    { file: 'note2.mp3'},
    { file: 'note3.mp3'},
    { file: 'note4.mp3'},
  ];

// generated a random array of number (just testing)
let numberOfNotes = 4;
let generatedSong = Array.from({length: numberOfNotes}, () => Math.floor(Math.random() * 4));

// Run a function on each array item. Right now I can console log element. I want to play a song that is associated with a number. 
// generatedSong.forEach(element => playSong(element));
generatedSong.forEach(element => console.log(element));

function playSong(el) {

};

const song = new Object({
    1:"note1.mp3",
    2:"note2.mp3",
    3:"note3.mp3",
    4:"note4.mp3",
});


class Game {
    constructor () {
        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
    }
    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}
const game = new Game();

setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<p>Dogtor Trog scored ${score}</p>` + chatText.innerHTML;
  }, 5000);
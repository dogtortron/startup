const btnDescriptions = [
    { file: 'Note1.mp3'},
    { file: 'Note2.mp3'},
    { file: 'Note3.mp3'},
    { file: 'Note4.mp3'},
  ];
class Button {
    constructor(description, el) {
        this.el = el;
        this.sound = loadSound(description.file);
      }
    async press(volume = 1.0) {
    return new Promise(async (pressResolve) => {
        await this.playSound(volume);
        pressResolve();
    });
    }

    async playSound(volume) {
    return new Promise((playResolve) => {
        this.sound.volume = volume;
        this.sound.onended = playResolve;
        this.sound.play();
    });
    }
}

class Game {
    buttons;
    allowPlayer;
    sequence;
    playerPlaybackPos;

    constructor () {
        this.buttons = new Map();
        this.allowPlayer = false;
        this.sequence = [];
        this.playerPlaybackPos = 0;
        

        document.querySelectorAll('.game-button').forEach((el, i) => {
            if (i < btnDescriptions.length) {
              this.buttons.set(el.id, new Button(btnDescriptions[i], el));
            }
          });

        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
    } //end constructor

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }

    async pressButton(button) {
        if (this.allowPlayer) {
            this.allowPlayer=true;
            await this.buttons.get(button.id).press(1.0);
          
          if (this.sequence[this.playerPlaybackPos].el.id === button.id) {
            this.playerPlaybackPos++;
            await say('Good job!');
            if (this.playerPlaybackPos === this.sequence.length) {
              this.playerPlaybackPos = 0;
              this.addNote();
              this.updateScore(this.sequence.length - 1);
              await this.playSequence();
            }
            this.allowPlayer = true;
          } else {
            this.saveScore(this.sequence.length - 1);
            this.allowPlayer=false;
            await say('You missed! Hit Reset --> Sing,Billy if you want to start over!');
          }
          }
      }

    async singBilly() {
        this.allowPlayer = false;
        this.changeOnclick();
        this.playerPlaybackPos = 0;
        this.sequence = [];
        this.addNote();
        this.updateScore('--');
        await this.playSequence();
        this.allowPlayer = true;
    }

    async reset() {
        location.reload();
    }

    changeOnclick() {
        const els = document.querySelectorAll( ".game-button" );
        for (var i=0; i < els.length; i++) {
            els[i].setAttribute("onclick", "game.pressButton(this)");
        }
    }
    getRandomNote() {
        let notes = Array.from(this.buttons.values());
        return notes[Math.floor(Math.random() * this.buttons.size)];
    }
    addNote() {
        const note = this.getRandomNote();
        this.sequence.push(note);
        // return this.sequence;
      }
    updateScore(score) {
        const scoreEl = document.querySelector('#score');
        scoreEl.textContent = score;
    }
    async playSequence() {
    await delay(2000);
    await say('Now listen!');
    await delay(1000);
    for (const note of this.sequence) {
        await note.press(1.0);
        await delay(randomCount());
    }
    await delay(500);
    await say('Now Play!');
    }

    saveScore(score) {
        const userName = this.getPlayerName();
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        scores = this.updateScores(userName, score, scores);
        
        localStorage.setItem('scores', JSON.stringify(scores));
        }
        
    updateScores(userName, score, scores) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        if (score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
        }
    }
    if (!found) {
        scores.push(newScore);
    }
    if (scores.length > 10) {
        scores.length = 10;
    }
    return scores;
    }

}

const game = new Game();

// placeholder for websocket messages
setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<p>Dogtor Trog scored ${score}</p>` + chatText.innerHTML;
  }, 5000);

function loadSound(filename) {
    return new Audio(filename);
  }

function delay(milliseconds) {
return new Promise((resolve) => {
    setTimeout(() => {
    resolve(true);
    }, milliseconds);
});
}

function randomCount() {
    let beat = 1000;
    let count = [2*beat,1*beat,1/2*beat,1/4*beat,1/8*beat,1/16*beat];
    return count[Math.floor(Math.random()*count.length)];
}

function say(something) {
    return new Promise((resolve) => {
        document.getElementById("game-message").innerHTML = something;
        resolve(true);
    })
}


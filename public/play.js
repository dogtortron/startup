// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

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
        this.configureWebSocket();
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
            if (this.playerPlaybackPos === this.sequence.length) {
              this.playerPlaybackPos = 0;
              this.addNote();
              await say('Good job!');
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
        // Let other players know a new game has started
        this.broadcastEvent(this.getPlayerName(), GameStartEvent, {});
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

    async saveScore(score) {
        const userName = this.getPlayerName();
        const date = new Date().toLocaleDateString();
        const newScore = {name: userName, score: score, date: date};

        try {
            const response = await fetch ('api/score', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newScore),
            });

            // Let other players know the game has concluded
            this.broadcastEvent(userName, GameEndEvent, newScore);

            // Store what the service gave us as the high scores
            const scores = await response.json();
            localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
            this.updateScoresLocal(newScore);
        }
    }
    updateScoresLocal(newScore) {
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        let found = false;
        for (const [i, prevScore] of scores.entries()) {
        if (newScore > prevScore.score) {
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

        localStorage.setItem('scores', JSON.stringify(scores));
    }

    // websocket stuff
    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
          this.displayMsg('system', 'game', 'connected');
        };
        this.socket.onclose = (event) => {
          this.displayMsg('system', 'game', 'disconnected');
        };
        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          if (msg.type === GameEndEvent) {
            this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
          } else if (msg.type === GameStartEvent) {
            this.displayMsg('player', msg.from, `started a new game`);
          }
        };
    }

    displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML =
        //   `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
          `<p>${from} ${msg}</p>` + chatText.innerHTML;
          
    }

    broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
    }
}

const game = new Game();

// placeholder for websocket messages
// keep this for reference if needed
// setInterval(() => {
//     const score = Math.floor(Math.random() * 3000);
//     const chatText = document.querySelector('#player-messages');
//     chatText.innerHTML =
//       `<p>Dogtor Trog scored ${score}</p>` + chatText.innerHTML;
//   }, 5000);

// // Actual websocket, moved it inside the game object
// displayMsg(cls, from, msg) {
//     const chatText = document.querySelector('#player-messages');
//     chatText.innerHTML =
//       `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
//   }

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
    let count = [1*beat,1/2*beat,1/4*beat,1/8*beat,1/16*beat,1/32*beat];
    return count[Math.floor(Math.random()*count.length)];
}

function say(something) {
    return new Promise((resolve) => {
        document.getElementById("game-message").innerHTML = something;
        resolve(true);
    })
}


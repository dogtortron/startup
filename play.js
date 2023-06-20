// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

const btnDescriptions = [
    { file: 'note1.mp3'},
    { file: 'note2.mp3'},
    { file: 'note3.mp3'},
    { file: 'note4.mp3'},
  ];
class Game {
  score;
  userSongArr;

  constructor () {
    this.score = 0;
    this.userSongArr = [];
    this.configureWebSocket();
    const playerNameEl = document.querySelector('.player-name');
    playerNameEl.textContent = this.getPlayerName();
  }

  getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
  }

  async generateSong() {
    let genSong = [];
    const n = 4;
    for (var i=0; i < n; i++) {
      let songNumber = Math.floor(Math.random()*4)
      let song = btnDescriptions[songNumber].file;
      let playSong = new Audio(song);
      const tempo = randomCount()
      await playSong.play();
      await delay(500)
      await delay(tempo)
      genSong.push(song,Math.round(tempo/1000));
    }
    genSong = genSong.slice(0,-1);
    return genSong;
  };


  playGame = () => {
    this.userSongArr = [];
    this.disableButton(".game-button")
    this.generateSong()
    .then((song) => {
      song = JSON.stringify(song);
      console.log("Your cheatsheet because life is difficult 🥳 \n Billy's song: ", song);
      return song;
    })
    .then(async (song) => {
      this.enableButton(".game-button");
      say('Now Play!');
      await delay(7500);
      return song;
    })
    .then((song) => {
      const userSong = this.generateUserSong();
      console.log("Your song: ",userSong);
      console.log(song === userSong);
      let result = song === userSong;
      return result;
    })
    .then((result) => {
      if (result) {
        this.score++;
        say('Good job!')
        console.log('woohooo, new score = ', this.score);
        this.updateScore(this.score);
      }
      else {
        this.disableButton(".game-button");
        this.disableButton(".singButton");
        say('So close! Hit reset to replay!')
        console.log('ooops, score = ', this.score);
        this.saveScore(this.score);
      }
    })
  }
  async reset() {
    location.reload();
    // Let other players know a new game has started
    this.broadcastEvent(this.getPlayerName(), GameStartEvent, {});
  }

  generateUserSong () {
    let newUserSong = [];
    newUserSong = this.userSongArr.slice(0,-1);
    const n = newUserSong.length;
    for (var i=1; i < n; i = i+2) {
      newUserSong[i] = this.userSongArr[i+2] - this.userSongArr[i];
      newUserSong[i] = Math.round(newUserSong[i]/1000);
    }
    this.userSongArr = [];
    let userSong = JSON.stringify(newUserSong);
    return userSong;
  }

  updateScore(score) {
    const scoreEl = document.querySelector('#score');
    scoreEl.textContent = score;
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

  getId(noteId) {
    console.log(noteId);
    let time = Date.now();
    this.userSongArr.push(noteId, time);
  }
  
  disableButton(buttonName) {
    const els = document.querySelectorAll( buttonName);
      for (var i=0; i < els.length; i++) {
        els[i].disabled = true;
      }
  }

  enableButton(buttonName) {
    const els = document.querySelectorAll( buttonName );
      for (var i=0; i < els.length; i++) {
        els[i].disabled = false;
      }
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
} // end of class Game
const game = new Game();

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
    let count = [1000,2000];
    return count[Math.floor(Math.random()*count.length)];
}

function say(something) {
    return new Promise((resolve) => {
        document.getElementById("game-message").innerHTML = something;
        resolve(true);
    })
}

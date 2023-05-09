# Sing Like Billy

## Description deliverable

### Elevator pitch

Have you ever heard a beautiful bird song and wanted to mimic it? Billy, a yellow canary, is eager to teach you his songs. Your challenge is to remember the song and repeat back by touching/clicking on the Note buttons. In this fun little game, your musical ears and memory will be put to the test! You can see who is trying to mimic Billy in real time and see how many songs you can mimic Billy. Are you ready? Let’s Sing Like Billy!

### Design

![Mock](singLikeBillyMockUI.jpg)


### Key features

- Secure login over HTTPS
- Ability to use keyboard/touch screen to interact and play sounds
- Display of user playing in real time
- Ability to rank users according to their scores
- Display of a scoreboard


### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Use of correct HTML structure for the game. Four HTML pages. One for login, one for playing, one for scoreboard, and one for the about page.
- **CSS** - Animation of the bird. Game styling that looks good on different screen sizes. 
- **JavaScript** - Login input, sound display, display of other users and scores.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving scores
- **DB** - Store users and scores in database.
- **Authentication** - Register and login users. Credentials securely stored in database.
- **WebSocket** - After each user played, their best score is displayed on the scoreboard.


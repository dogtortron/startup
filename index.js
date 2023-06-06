const express = require('express');
const app = express();
const config = require('./dbConfig.json');
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', async (req, res) => {
  DB.addScore(req.body);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// GetBird
const { createApi } = require ('unsplash-js');
const unsplash = createApi({
  accessKey: config.unsplashKey,
});

apiRouter.get('/birds', (_req, res) => {
  unsplash.photos.getRandom({
    query: 'bird',
    featured: true,
    count: 1,
  })
  .then(result => {
    const birds = result.response;
    res.send(birds);
  })
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



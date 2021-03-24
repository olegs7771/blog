const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res, next) => {
  console.log('req.body event-bus', req.body);
  const event = req.body;

  axios.post('http://localhost:4000/events', event); //to posts
  axios.post('http://localhost:4001/events', event); // to comments
  axios.post('http://localhost:4002/events', event); // to query
  axios.post('http://localhost:4003/events', event); // to moderation

  res.status(200).json({ eventbus: 'posted' });
});

app.listen(4005, () => {
  console.log('Event-Bus on 4005');
});

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { randomBytes } = require('crypto');

const posts = {};

// app.get('/posts',(req,res,next)=>{
// res.json(posts)
// })

app.post('/posts', async (req, res, next) => {
  console.log('req body', req.body);
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    title,
    id,
  };

  //Emit event to event-bus on new post created
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      title,
      id,
    },
  });

  res.status(201).send(posts[id]);
});

//Event from Event-Bus

app.post('/events', (req, res, next) => {
  console.log('posts received event from EB', req.body.type);
  res
    .status(200)
    .json({ message: 'received event from EB ', data: req.body.type });
});

app.listen(4000, () => {
  console.log('Posts on  4000');
});

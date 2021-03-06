const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const posts = {};
console.log('posts in query service global', posts);

app.get('/posts', (req, res, next) => {
  res.status(200).json(posts);
});

const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    //Create Post
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    //Create comment
    const { id, comment, postId, status } = data;
    // 1) find proper post in posts object

    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }

  if (type === 'CommentUpdated') {
    const { id, comment, postId, status } = data;
    //find in object posts{} comment that we updated
    const post = posts[postId];
    const commentToUpdate = post.comments.find((comment) => {
      return comment.id === id;
    });
    commentToUpdate.status = status;
    commentToUpdate.comment = comment;
  }
};

// COMING FROM EVENT-BUS
app.post('/events', (req, res, next) => {
  const { type, data } = req.body;

  handleEvents(type, data);
  res.status(200).json({ message: 'query got event' });
});

app.listen(4002, async () => {
  console.log('Query on 4002');

  //AFTER SERVICE BACK ALIVE WE WANT TO RETREIVE ALL MISSED EVENTS PRIOR TO THIS TIME

  const res = await axios.get('http://event-bus-srv:4005/events');

  for (let event of res.data) {
    console.log('Proccesing event :', event.type);
    handleEvents(event.type, event.data);
  }
});

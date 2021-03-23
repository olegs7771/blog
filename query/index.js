const express = require('express');
const bodyParser = require('body-parser');
// const axios= require('axios');

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

app.post('/events', (req, res, next) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    //Create Post
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    //Create comment
    const { id, comment, postId } = data;
    // 1) find proper post in posts object

    const post = posts[postId];
    post.comments.push({ id, comment });
  }
  console.log('posts in query service', posts);
  res.status(200).json({ message: 'query got event' });
});

app.listen(4002, () => {
  console.log('Query on 4002');
});

const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
// const axios= require('axios');

const app = express();

app.use(bodyParser.json());

// RECEVING FROM EVENT-BUS FOR COMMENT  MODERATION
app.post('/events', async (req, res, next) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.comment.includes('orange') ? 'rejected' : 'approved';

    //Post to event-bus updated comments object .status updated
    console.log('data in moderation', data);
    try {
      const res = await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          ...data,
          status,
        },
      });
    } catch (error) {
      console.log(
        'error to post updated comment after moderation to event-bus',
        error.response.data
      );
    }
  }
  res.status(201).json({ message: 'moderation finished' });
});

app.listen(4003, () => {
  console.log('Moderation on 4003');
});

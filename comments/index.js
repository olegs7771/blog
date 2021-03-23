const express= require('express');
const bodyParser = require('body-parser')
const {randomBytes}=require('crypto');
const cors=require('cors')
const axios=require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// app.all('*',(req,res,next)=>{
//   console.log('comments middleware' );
//   next()
// })




const commentsByPostId={}

app.post('/posts/:id/comments',async(req,res,next)=>{
  console.log('commentsByPostId1',commentsByPostId);

  console.log('req.body add comment',req.body);
  const commentId= randomBytes(4).toString('hex');
  const{comment}=req.body;
  const comments =commentsByPostId[req.params.id]||[]
  console.log('comments',comments);
  comments.push({id:commentId,comment});
  commentsByPostId[req.params.id]=comments;
  
  console.log('commentsByPostId2',commentsByPostId);
  
  //Send event to event-bus 

  await axios.post('http://localhost:4005/events',{
    type:"CommentCreated",
    data:{
      id:commentId,
      comment,
      postId:req.params.id
    }

  })

res.status(201).json(comments)

})

app.get('/posts/:id/comments',(req,res,next)=>{
res.json(commentsByPostId[req.params.id]||[])
})


//Event from Event-Bus


app.post('/events',(req,res,next)=>{
  console.log('comments received event from EB',req.body.type);
  res.status(200).json({message:'comments received event from EB ',data:req.body.type})
})

app.listen(4001,()=>{
  console.log('Comments on 4001');
})


///



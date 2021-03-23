const express = require('express');
const bodyParser = require('body-parser');
// const axios= require('axios');

const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

const posts={};

app.get('/posts',(req,res,next)=>{
  
})


app.post('/events',(req,res,next)=>{
  const {event,data}=req.data

if(type==='PostCreated'){
  const {id,title}=data;
  //Create Post
  posts[id]={id,tittle,comments:[]}
  
}
if(type==='CommentCreated'){
  //Create comment
const{id,comment,postId}=data
// 1) find proper post in posts object 

const post = posts[postId];
post.comments.push({id,comment});


}


console.log('Query received event,data',event,data);
})


app.listen(4002,()=>{
  console.log('Query on 4002');
})
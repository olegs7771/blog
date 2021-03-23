import React,{useState,useEffect} from 'react'
import axios from 'axios';

export default function CommentList({postId}) {

  const [comments,setComments]=useState([])

  const fetchComments=async()=>{
    try {
      const res= await axios.get(`http://localhost:4001/posts/${postId}/comments`)

      
      setComments(res.data)
      
    } catch (error) {
      console.log('error to get comments',error);
    }

  }

  useEffect(() => {
    fetchComments()
   }, [])

const renderCommentsList=comments.map(comment=>{
  return (
    <li key={comment.id}>{comment.comment}</li>
  )
})

  return (
    <ul>
      {renderCommentsList}
     
    </ul>
  )
}

import React,{useState} from 'react'
import axios from 'axios';

export default function CommentCreate({postId}) {
  const [comment,setComment]=useState('')

const _onSubmit= async(e)=>{
e.preventDefault();

try {
  const data={
    comment
  }
  const res = await axios.post(`http://localhost:4001/posts/${postId}/comments`,data);
  console.log('res.data',res.data);
  
} catch (error) {
  console.log('error add comment',error);
}

setComment('')

}
   


  return (
    <div>
      <form onSubmit={_onSubmit}>
        <div className="form-group">
        <label htmlFor="comment">New Comment</label>
            <input type="text" 
            className="form-control"
            id='comment' 
            value={comment} 
            onChange={(e)=>setComment(e.target.value)}/>
          
        </div>
        <button  className="btn btn-sm btn-primary">Add Comment</button>

      </form>
    </div>
  )
}

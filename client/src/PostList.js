import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:4002/posts');
      console.log('res.data get posts', res.data);
      setPosts(res.data);
    } catch (error) {
      console.log('error to get posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log('posts', posts);
  const renderPosts = Object.values(posts).map((post, index) => (
    <div
      className="card"
      style={{ width: '30% ', marginBottom: '20px' }}
      key={index}
    >
      <div className="card-body">
        <h4>{post.title}</h4>
        <CommentCreate postId={post.id} />
        <hr />
        <CommentList comments={post.comments} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}

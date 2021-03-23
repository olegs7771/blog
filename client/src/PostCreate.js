import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
  // STATE
  const [title, setTitle] = useState('');

  const _onSubmit = async (e) => {
    e.preventDefault();
    console.log('title', title);

    try {
      const data = {
        title,
      };
      const res = await axios.post('http://localhost:4000/posts', data);
      console.log('res.data post posts', res.data);
    } catch (error) {
      console.log('error', error);
    }
    setTitle('');
  };
  return (
    <div>
      <form onSubmit={_onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
         
          <button className="btn btn-primary">Post</button>
        </div>
      </form>
    </div>
  );
}

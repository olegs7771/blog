import React from 'react';

export default function CommentList({ comments }) {
  const renderCommentsList = comments.map((comment) => {
    return <li key={comment.id}>{comment.comment}</li>;
  });

  return <ul>{renderCommentsList}</ul>;
}

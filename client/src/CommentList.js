import React from 'react';

export default function CommentList({ comments }) {
  const renderCommentsList = comments.map((comment) => {
    const content =
      comment.status === 'approved'
        ? comment.comment
        : comment.status === 'pending'
        ? 'pending moderation'
        : 'comment rejected';

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderCommentsList}</ul>;
}

import React, { useState } from 'react';
import axios from 'axios';
const apiLink = process.env.REACT_APP_BACKEND_LINK;
console.log(apiLink);

function CommentForm({ postId, addComment }) {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const response = await axios.post(`${apiLink}/posts/comments`, { postId, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      addComment(response.data);
      setContent('');
    } catch (error) {
      console.error('There was an error creating the comment!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label className="block mb-2">Add a comment</label>
        <textarea
          name="content"
          value={content}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Post Comment</button>
    </form>
  );
}

export default CommentForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiLink = process.env.REACT_APP_BACKEND_LINK;
console.log(apiLink);

function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${apiLink}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    //   alert('Post created successfully');
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the post!', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;

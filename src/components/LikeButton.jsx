import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiLink = process.env.REACT_APP_BACKEND_LINK;
console.log(apiLink);

function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${apiLink}/posts/${postId}/likes`);
        setLikes(response.data.likes);
        setHasLiked(response.data.hasLiked);
      } catch (error) {
        console.error('There was an error fetching the likes!', error);
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${apiLink}/likes`, { postId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(likes + 1);
      setHasLiked(true);
    } catch (error) {
      console.error('There was an error liking the post!', error);
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiLink}/likes`, {
        data: { postId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(likes - 1);
      setHasLiked(false);
    } catch (error) {
      console.error('There was an error unliking the post!', error);
    }
  };


  console.log("likes is: ", likes);

  return (
    // <div className="mt-4">
    //   <button
    //     onClick={hasLiked ? handleDislike : handleLike}
    //     disabled={hasLiked && !likes}
    //     className={`p-2 w-20 ${hasLiked ? 'bg-red-500' : 'bg-blue-500'} text-white rounded`}
    //   >
    //     {hasLiked ? 'Liked' : 'Like'}
    //   </button>

    //   <span className="ml-2">{likes} {likes === 1 ? 'like' : 'likes'}</span>
    // </div>

<div className="mt-4">
  <button
    onClick={hasLiked ? handleDislike : handleLike}
    disabled={hasLiked && likes === 0} // Disable if already liked and no likes left
    className={`p-2 w-20 ${hasLiked ? 'bg-red-500' : 'bg-blue-500'} text-white rounded`}
  >
    {hasLiked ? 'Liked' : 'Like'}
  </button>

  <span className="ml-2">{likes} {likes === 1 ? 'like' : 'likes'}</span>
</div>


  );
}

export default LikeButton;

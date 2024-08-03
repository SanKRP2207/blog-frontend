import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
const apiLink = process.env.REACT_APP_BACKEND_LINK;
console.log(apiLink);

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiLink}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the post:', error.response || error.message);
        setError('Error fetching post');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiLink}/posts/${id}/comments`);
        setComments(response.data);
        console.log("comments",response);
      } catch (error) {
        console.error('Error fetching comments:', error.response || error.message);
        setError('Error fetching comments');
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchPost(), fetchComments()]);
      } catch (err) {
        console.error('Error in fetching data:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {post ? (
        <>
          <h2 className="text-2xl mb-4">{post.title}</h2>
          <p className="mb-4">{post.content}</p>
          <LikeButton postId={post.id} />
          <CommentForm postId={post.id} addComment={(comment) => setComments([...comments, comment])} />
          <div className="mt-6">
            <h3 className="text-xl mb-4">Comments</h3>
            {comments.length ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-4 p-4 border border-gray-300 rounded">
                  <p><strong>Comment:</strong> {comment.content}</p>
                  <p><strong>Author ID:</strong> {comment.authorId}</p>
                  <p><strong>Created At:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}

export default PostDetail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// require('dotenv');
const apiLink = process.env.REACT_APP_BACKEND_LINK;
console.log(apiLink);


function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${apiLink}`);
                setPosts(response.data);
            } catch (error) {
                console.error('There was an error fetching the posts!', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl mb-4">Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="mb-4 p-4 border border-gray-300 rounded">
                    <h3 className="text-xl mb-2">{post.title}</h3>
                    <p>{post.content}</p>
                    <Link to={`/postsDetail/${post.id}`} className="text-blue-500">Read More</Link>
                </div>
            ))}
        </div>
    );
}

export default PostList;

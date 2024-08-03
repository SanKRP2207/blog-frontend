import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiLink = process.env.REACT_APP_BACKEND_LINK;
console.log(apiLink);


function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiLink}/login`, formData);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('There was an error logging in!', error);

            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                // Redirect to registration page if login fails
                navigate('/register');
            } else {
                // Handle other errors or show a generic error message
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
}

export default Login;

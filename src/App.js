import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PostList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/postsDetail/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

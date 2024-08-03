// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-xl font-bold">Blog Platform</Link>
          </div>
          <div className="flex space-x-4">
            {token ? (
              <>
                <Link to="/create-post" className="hover:text-gray-300">Create Post</Link>
                <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import {Link, useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    onLogout();
    navigate("/login");
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>You have been logged out.</h2>
      <button 
        onClick={handleLogout} 
        className="btn btn-primary"
        style={{ marginTop: '20px' }}
      >
        Login Again
      </button>
    </div>
  );
}
export default Logout;
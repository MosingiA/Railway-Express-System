import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar-container">
      <h1 className="navbar-h1">Train Ticket Booking System</h1>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/trains">Trains</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/book-ticket">Book Ticket</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </header>
  );
}

export default Navbar;
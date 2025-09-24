import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Railway Express System</h1>
          <p className="hero-description">
            Your complete solution for railway management - book tickets, view schedules, and manage your journey with ease
          </p>
          <div className="hero-actions">
            <Link to="/trains" className="btn btn-primary btn-lg">Explore Trains</Link>
            <Link to="/book-ticket" className="btn btn-success btn-lg">Book Now</Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Railway Express?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>View Trains</h3>
              <p>Browse available trains, schedules, and routes across the network</p>
              <Link to="/trains" className="btn btn-outline">Explore</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Book Ticket</h3>
              <p>Quick and easy booking with multiple secure payment options</p>
              <Link to="/book-ticket" className="btn btn-outline">Book Now</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>My Tickets</h3>
              <p>View, manage, and cancel your existing ticket bookings</p>
              <Link to="/tickets" className="btn btn-outline">Manage</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
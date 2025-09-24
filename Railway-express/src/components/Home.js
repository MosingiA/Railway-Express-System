import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="card">
      <div className="home-hero">
        <h1>Railway Express System</h1>
        <p style={{fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto'}}>Your complete solution for railway management - book tickets, view schedules, and manage your journey with ease</p>
      </div>
      
      <div className="grid grid-3 mt-3">
        <div className="card train-card">
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <h3>View Trains</h3>
            <p>Browse available trains, schedules, and routes across the network</p>
            <Link to="/trains" className="btn btn-primary">Explore Trains</Link>
          </div>
        </div>
        
        <div className="card ticket-card">
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <h3>Book Ticket</h3>
            <p>Quick and easy booking with multiple secure payment options</p>
            <Link to="/book-ticket" className="btn btn-success">Book Now</Link>
          </div>
        </div>
        
        <div className="card ticket-card">
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <h3>My Tickets</h3>
            <p>View, manage, and cancel your existing ticket bookings</p>
            <Link to="/tickets" className="btn btn-primary">Manage Tickets</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
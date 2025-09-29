import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetch('https://railway-express-system-2-ni6u.onrender.com//tickets')
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tickets:', err);
        setLoading(false);
      });
  };

  const deleteTicket = (id) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      fetch(`https://railway-express-system-2-ni6u.onrender.com/tickets/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        setTickets(tickets.filter(ticket => ticket.id !== id));
      })
      .catch(err => console.error('Error deleting ticket:', err));
    }
  };

  if (loading) return <div className="loading">Loading tickets...</div>;

  return (
    <div className="card">
      <h2>My Tickets</h2>
      {tickets.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <p style={{fontSize: '1.2rem', marginBottom: '20px'}}>No tickets found</p>
          <Link to="/book-ticket" className="btn btn-success">Book Your First Ticket</Link>
        </div>
      ) : (
        <div className="grid grid-2">
          {tickets.map(ticket => (
            <div key={ticket.id} className="card ticket-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <h3 style={{margin: 0}}>Ticket #{ticket.ticket_number}</h3>
                <span style={{background: ticket.payment_status === 'confirmed' ? '#00b894' : '#ff9800', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'}}>
                  {ticket.payment_status.toUpperCase()}
                </span>
              </div>
              <div style={{display: 'grid', gap: '8px', marginBottom: '20px'}}>
                <p><strong>Passenger:</strong> {ticket.passenger?.name || 'Unknown'}</p>
                <p><strong>Train:</strong> {ticket.train?.name || 'Unknown'}</p>
                <p><strong>Route:</strong> {ticket.from_station} → {ticket.to_station}</p>
                <p><strong>Price:</strong> KSh {ticket.price}</p>
                <p><strong>Payment:</strong> {ticket.payment_method?.replace('_', ' ').toUpperCase() || 'N/A'}</p>
              </div>
              <button 
                onClick={() => deleteTicket(ticket.id)}
                className="btn btn-danger"
              >
                Cancel Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tickets;
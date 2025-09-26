import React, { useState, useEffect } from 'react';
import AddTrain from './AddTrain';

function Trains() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch('https://railway-express-system-5.onrender.com/simple-trains')
      .then(res => res.json())
      .then(data => {
        setTrains(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching trains:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading trains...</div>;

  const handleTrainAdded = (newTrain) => {
    setTrains([...trains, newTrain]);
    setShowAddForm(false);
  };

  return (
    <div className="card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Available Trains</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Train'}
        </button>
      </div>
      
      {showAddForm && <AddTrain onTrainAdded={handleTrainAdded} />}
      
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
        {trains.map(train => (
          <div key={train.id} className="card train-card" style={{flex: '1 1 300px'}}>
            <h3>{train.name}</h3>
            <div style={{display: 'grid', gap: '10px'}}>
              <p><strong>Capacity:</strong> {train.capacity} passengers</p>
              <p><strong>Departure:</strong> {train.departure_time}</p>
              <p><strong>Routes:</strong> {train.train_routes?.length || 0} available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trains;
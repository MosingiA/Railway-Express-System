import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  city: Yup.string().min(2, 'City must be at least 2 characters').required('City is required')
});

function Stations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch('https://railway-express-system-2-ni6u.onrender.com/stations')
      .then(res => res.json())
      .then(data => {
        setStations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stations:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://railway-express-system-2-ni6u.onrender.com/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const newStation = await response.json();
      setStations([...stations, newStation]);
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding station:', error);
    }
    setSubmitting(false);
  };

  if (loading) return <div className="loading">Loading stations...</div>;

  return (
    <div className="card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Railway Stations</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Station'}
        </button>
      </div>
      
      {showAddForm && (
        <div className="card" style={{marginBottom: '20px'}}>
          <h3>Add New Station</h3>
          <Formik
            initialValues={{ name: '', city: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Station Name</label>
                  <Field name="name" className="form-control" />
                  <ErrorMessage name="name" className="error" component="div" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <Field name="city" className="form-control" />
                  <ErrorMessage name="city" className="error" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-success">
                  {isSubmitting ? 'Adding...' : 'Add Station'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
        {stations.map(station => (
          <div key={station.id} className="card">
            <h3>{station.name}</h3>
            <p><strong>City:</strong> {station.city}</p>
            <p><strong>Routes:</strong> {station.train_routes?.length || 0} available</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stations;
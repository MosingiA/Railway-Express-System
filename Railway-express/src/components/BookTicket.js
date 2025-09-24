import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  age: Yup.number()
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be less than 120')
    .required('Age is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  train_id: Yup.number().required('Please select a train'),
  from_station: Yup.string().required('From station is required'),
  to_station: Yup.string().required('To station is required'),
  payment_method: Yup.string().required('Payment method is required')
});

function BookTicket() {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5555/trains').then(res => res.json()),
      fetch('http://localhost:5555/stations').then(res => res.json())
    ])
    .then(([trainsData, stationsData]) => {
      setTrains(trainsData);
      setStations(stationsData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Create passenger first
      const passengerRes = await fetch('http://localhost:5555/passengers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          age: values.age,
          phone_number: values.phone_number
        })
      });
      const passenger = await passengerRes.json();

      // Create ticket
      const ticketRes = await fetch('http://localhost:5555/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passenger_id: passenger.id,
          train_id: values.train_id,
          from_station: values.from_station,
          to_station: values.to_station,
          payment_method: values.payment_method,
          price: 1300 // Default price
        })
      });
      const ticket = await ticketRes.json();

      setSuccess(`Ticket booked successfully! Ticket #${ticket.ticket_number}`);
      resetForm();
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
    setSubmitting(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="card">
      <h2> Book a Ticket</h2>
      {success && <div className="success-message">{success}</div>}
      
      <Formik
        initialValues={{
          name: '',
          age: '',
          phone_number: '',
          train_id: '',
          from_station: '',
          to_station: '',
          payment_method: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{display: 'flex', overflowX: 'auto', gap: '30px', padding: '10px 0'}}>
              <div style={{minWidth: '350px', flexShrink: 0}}>
                <div className="form-group">
                  <label>Name</label>
                  <Field name="name" className="form-control" />
                  <ErrorMessage name="name" className="error" component="div" />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <Field name="age" type="number" className="form-control" />
                  <ErrorMessage name="age" className="error" component="div" />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <Field name="phone_number" className="form-control" />
                  <ErrorMessage name="phone_number" className="error" component="div" />
                </div>

                <div className="form-group">
                  <label>Train</label>
                  <Field as="select" name="train_id" className="form-control">
                    <option value="">Select a train</option>
                    {trains.map(train => (
                      <option key={train.id} value={train.id}>
                        {train.name} - {train.departure_time}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="train_id" className="error" component="div" />
                </div>
              </div>

              <div style={{minWidth: '350px', flexShrink: 0}}>
                <div className="form-group">
                  <label>From Station</label>
                  <Field as="select" name="from_station" className="form-control">
                    <option value="">Select departure station</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.name}>
                        {station.name} ({station.city})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="from_station" className="error" component="div" />
                </div>

                <div className="form-group">
                  <label>To Station</label>
                  <Field as="select" name="to_station" className="form-control">
                    <option value="">Select destination station</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.name}>
                        {station.name} ({station.city})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="to_station" className="error" component="div" />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <Field as="select" name="payment_method" className="form-control">
                    <option value="">Select payment method</option>
                    <option value="stk_push">STK Push (M-Pesa)</option>
                    <option value="cash">Cash Payment</option>
                    <option value="skip">Skip Payment</option>
                  </Field>
                  <ErrorMessage name="payment_method" className="error" component="div" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-success"
                >
                  {isSubmitting ? 'Booking...' : 'Book Ticket'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookTicket;
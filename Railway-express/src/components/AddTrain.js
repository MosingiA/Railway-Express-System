import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  capacity: Yup.number().min(1, 'Capacity must be at least 1').required('Capacity is required'),
  departure_time: Yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format').required('Departure time is required')
});

function AddTrain({ onTrainAdded }) {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://railway-express-system-5.onrender.com/trains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const newTrain = await response.json();
      onTrainAdded(newTrain);
      resetForm();
    } catch (error) {
      console.error('Error adding train:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="card">
      <h3>Add New Train</h3>
      <Formik
        initialValues={{ name: '', capacity: '', departure_time: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Train Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" className="error" component="div" />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <Field name="capacity" type="number" className="form-control" />
              <ErrorMessage name="capacity" className="error" component="div" />
            </div>
            <div className="form-group">
              <label>Departure Time</label>
              <Field name="departure_time" placeholder="HH:MM" className="form-control" />
              <ErrorMessage name="departure_time" className="error" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? 'Adding...' : 'Add Train'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddTrain;
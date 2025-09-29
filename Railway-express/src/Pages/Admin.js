import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TrainSchema = Yup.object().shape({
  name: Yup.string().min(2, "Minimum 2 characters").required("Required"),
  capacity: Yup.number().min(1, "Must be positive").required("Required"),
  departure_time: Yup.string().required("Required")
});

export default function Admin() {
  const [trains, setTrains] = useState([{id: 1, name: "Demo Train", capacity: 100}]);

 return (
  <div className="admin-container">
    <h2 className="admin-header">Admin Dashboard</h2>

<div className="admin-card">
  <h3>Create Train</h3>
  <Formik 
    initialValues={{ name: "", capacity: "", departure_time: "" }} 
    validationSchema={TrainSchema} 
    onSubmit={async (vals, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch('https://railway-express-system-2-ni6u.onrender.com/trains', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: vals.name,
            capacity: parseInt(vals.capacity),
            departure_time: vals.departure_time
          }),
        });
        
        if (response.ok) {
          alert(`Train created: ${vals.name}`);
          resetForm();
        } else {
          alert('Failed to create train');
        }
      } catch (error) {
        alert('Error creating train');
        console.error(error);
      }
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form className="admin-form">
        <label>Name</label>
        <Field name="name" />
        <ErrorMessage name="name" component="div" className="error" />
        
        <label>Capacity</label>
        <Field name="capacity" type="number" />
        <ErrorMessage name="capacity" component="div" className="error" />
        
        <label>Departure Time</label>
        <Field name="departure_time" placeholder="HH:MM" />
        <ErrorMessage name="departure_time" component="div" className="error" />
        
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Creating...' : 'Create Train'}
        </button>
      </Form>
    )}
  </Formik>
</div>

<div className="admin-card">
  <h3>System Overview</h3>
  <div className="admin-stats">
    <p><strong>Total Trains:</strong> {trains.length}</p>
    <p><strong>System Status:</strong> Active</p>
  </div>
</div>
  </div>
);
}
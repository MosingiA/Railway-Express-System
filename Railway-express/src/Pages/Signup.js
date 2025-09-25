import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  age: Yup.number().nullable().min(18, "Must be 18+"),
  phone_number: Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be 10 digits"
  ).required("Required")
});

export default function SignUp({ onLogin }) {
  const nav = useNavigate();
  
  return (
    <div className="signup-container">
      <video className="signup-background-video" autoPlay muted loop>
        <source src="/train-video.mp4" type="video/mp4" />
      </video>
      <div className="signup-overlay">
        <h1 style={{textAlign: 'center', color: 'white', marginBottom: '2rem'}}>Railway Management System</h1>
        <div className="signup-card">
          <h2>Create Account</h2>
          <Formik
            initialValues={{ name: "", email: "", password: "", age: "", phone_number: "" }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch('http://localhost:5555/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });
                
                if (response.ok) {
                  alert('Signup successful!');
                  nav("/login");
                } else {
                  const error = await response.json();
                  alert(error.message);
                }
              } catch (error) {
                alert('Signup failed');
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="signup-form-group">
                  <label>Name</label>
                  <Field name="name" className="signup-form-control" />
                  <ErrorMessage name="name" component="div" className="signup-error" />
                </div>

                <div className="signup-form-group">
                  <label>Email</label>
                  <Field name="email" className="signup-form-control" />
                  <ErrorMessage name="email" component="div" className="signup-error" />
                </div>

                <div className="signup-form-group">
                  <label>Password</label>
                  <Field type="password" name="password" className="signup-form-control" />
                  <ErrorMessage name="password" component="div" className="signup-error" />
                </div>

                <div className="signup-form-group">
                  <label>Age</label>
                  <Field type="number" name="age" className="signup-form-control" />
                  <ErrorMessage name="age" component="div" className="signup-error" />
                </div>

                <div className="signup-form-group">
                  <label>Phone Number</label>
                  <Field name="phone_number" className="signup-form-control" />
                  <ErrorMessage name="phone_number" component="div" className="signup-error" />
                </div>

                <button type="submit" disabled={isSubmitting} className="signup-btn">
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          
          <p style={{textAlign: 'center', marginTop: '20px'}}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

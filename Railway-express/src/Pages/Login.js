import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});

export default function Login({ onLogin }) {
  const nav = useNavigate();
  
  return (
    <div className="login-container">
      <video className="background-video" autoPlay muted loop>
        <source src="/train-video.mp4" type="video/mp4" />
      </video>
      <div className="login-overlay">
        <h1 style={{textAlign: 'center', color: 'white', marginBottom: '2rem'}}>Railway Management System</h1>
        <div className="card">
          <h2>Login Required</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch('http://localhost:5555/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });
                
                if (response.ok) {
                  onLogin();
                  nav("/");
                } else {
                  const error = await response.json();
                  alert(error.message);
                }
              } catch (error) {
                console.error('Login error:', error);
                alert('Login failed: ' + error.message);
              }
              setSubmitting(false);
            }}

          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Email</label>
                  <Field name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting ? "Logging in..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>
          
          <p style={{textAlign: 'center', marginTop: '20px'}}>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

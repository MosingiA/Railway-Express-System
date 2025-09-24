import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, "Minimum 2 characters").required("Required"),
  age: Yup.number().min(1, "Must be positive").max(120, "Must be under 120").required("Required")
});

export default function Profile() {
  const [profile] = useState({ name: "", age: "" });

  return (
    <div className="card">
      <h2>My Profile</h2>
      <Formik
        initialValues={{ name: profile.name, age: profile.age || "", password: "" }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(`Profile updated for: ${values.name}`);
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <label>Name</label>
            <Field name="name" />
            <label>Age</label>
            <Field name="age" type="number" />
            <label>Change password (optional)</label>
            <Field name="password" type="password" />
            <button disabled={isSubmitting} type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


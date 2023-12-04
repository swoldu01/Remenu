import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = ({ email, password }) => {
    const data = { email, password };
    console.log(data);
    axios.post('http://localhost:5000/auth/register', data)
    .then(response => {
      console.log(response.data);
      // Handle response, e.g., show success message, navigate to login page, etc.
    })
    .catch(error => {
      console.error('Registration error:', error.response);
    });
};


  return (
    <div className="container">
      <h1>Register</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <label>Username:</label>
          <Field name="username" type="text" className="form-control" />
          <ErrorMessage name="username" component="div" />

          <label>Email:</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" component="div" />

          <label>Password:</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage name="password" component="div" />

          <label>Confirm Password:</label>
          <Field name="confirmPassword" type="password" className="form-control" />
          <ErrorMessage name="confirmPassword" component="div" />

          <button type="submit" className="btn btn-primary mt-2">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;

import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get the token from the URL

  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = (values) => {
    const data = { ...values, token };
    axios.post('http://localhost:5000/auth/reset-password', data)
      .then(response => {
        console.log(response.data);
        // Show success message and redirect to login page
      })
      .catch(error => {
        console.error('Error resetting password:', error.response);
        // Handle errors
      });
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <label>New Password:</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage name="password" component="div" />

          <label>Confirm New Password:</label>
          <Field name="confirmPassword" type="password" className="form-control" />
          <ErrorMessage name="confirmPassword" component="div" />

          <button type="submit" className="btn btn-primary mt-2">Reset Password</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordReset;

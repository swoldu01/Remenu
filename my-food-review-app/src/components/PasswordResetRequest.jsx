import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PasswordResetRequest = () => {
  const initialValues = {
    email: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  });

  const onSubmit = (values) => {
    axios.post('http://localhost:5000/auth/request-reset-password', values)
      .then(response => {
        console.log(response.data);
        // Show a success message
      })
      .catch(error => {
        console.error('Error requesting password reset:', error.response);
        // Handle errors
      });
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <label>Email:</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" component="div" />

          <button type="submit" className="btn btn-primary mt-2">Request Password Reset</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordResetRequest;

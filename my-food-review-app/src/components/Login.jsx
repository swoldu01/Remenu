import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  const onSubmit = (data) => {
    console.log(data);
    axios.post('http://localhost:5000/auth/login', data)
    .then(response => {
      console.log(response);
     const { token, refreshToken } = response.data;
     Cookies.set('jwt', token, { expires: 1, sameSite: 'Strict' });
     Cookies.set('refreshToken', refreshToken, { expires: 7, sameSite: 'Strict' }); // Expires in 7 days
    navigate('/'); // Navigate to home page
    })
    .catch(error => {
      console.error('Login error:', error.response);
      // Handle errors, e.g., show error message
    });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <label>Email:</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" component="div" />

          <label>Password:</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" className="btn btn-primary mt-2">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

const CreateDish = ({ restaurantId }) => {
  const initialValues = {
    name: '',
    price: '',
    // Add other initial values here
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    // Add other validations here
  });

  const onSubmit = async (values) => {
    try {
      const token = Cookies.get('jwt');
      const response = await axios.post(`http://localhost:5000/admin/restaurants/${restaurantId}/dishes`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating dish:', error.response);
      // Handle errors
    }
  };

  return (
    <div>
      <h2>Create Dish</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component="div" />

          <Field name="price" type="number" placeholder="Price" />
          <ErrorMessage name="price" component="div" />

          {/* Add other fields here */}

          <button type="submit">Create Dish</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateDish;

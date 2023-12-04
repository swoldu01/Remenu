import React from 'react';
import axios from 'axios';
import HoursOfOperation from './HoursOfOperation';
import { CUISINE_TYPES, DISH_TYPES, DIETARY_RESTRICTIONS, RESTAURANT_CATEGORIES } from '../Utility/constants';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

const CreateRestaurant = () => {
  const initialValues = {
    name: '',
    description: '',
    location: '',
    contactinfo: '',
    hoursOfOperation: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' },
    },
    cuisineType: [],
    dishType: [],
    dietaryRestrictions: [],
    setting: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    contactinfo: Yup.string().required('Required'),
    setting: Yup.string().required('Required'),

  });

  const onSubmit = async (values) => {
    try {
      const token = Cookies.get('jwt');
      const response = await axios.post('http://localhost:5000/admin/restaurants', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating restaurant:', error.response);
      // Handle errors
    }
  };

  return (
    <div>
    <h2>Create Restaurant</h2>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component="div" />

          <Field name="description" type="text" placeholder="Description" />
          <ErrorMessage name="description" component="div" />

          <Field name="location" type="text" placeholder="Location" />
          <ErrorMessage name="location" component="div" />

          <Field name="contactinfo" type="text" placeholder="Contact Info" />
          <ErrorMessage name="contactinfo" component="div" />

          <HoursOfOperation values={values.hoursOfOperation} setFieldValue={setFieldValue} />

          <Field as="select" name="cuisineType" multiple>
            {CUISINE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </Field>

          <Field as="select" name="dishType" multiple>
            {DISH_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </Field>

          <Field as="select" name="dietaryRestrictions" multiple>
            {DIETARY_RESTRICTIONS.map(restriction => <option key={restriction} value={restriction}>{restriction}</option>)}
          </Field>

          <Field as="select" name="setting">
            {RESTAURANT_CATEGORIES.map(setting => <option key={setting} value={setting}>{setting}</option>)}
          </Field>

          <button type="submit">Create Restaurant</button>
        </Form>
      )}
    </Formik>
  </div>
);
};

export default CreateRestaurant;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import MultiSelectCheckbox from '../Utility/checkbox';
import { CUISINE_TYPES, DISH_TYPES, DIETARY_RESTRICTIONS, MAIN_INGREDIENTS } from '../Utility/constants';

const CreateDish = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const token = Cookies.get('jwt');
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      const url = userRole === 'admin' 
        ? 'http://localhost:5000/admin/restaurants' 
        : 'http://localhost:5000/owner/restaurants';

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const initialValues = {
    restaurant: '', // Added field for selected restaurant
    name: '',
    price: '',
    mainIngredients: [],
    cuisineType: [],
    dishType: [],
    dietaryRestrictions: [],
    setting: '',
    tags: [],
    // featuredPhotos: [], // Handle this separately if you're uploading files
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    mainIngredients: Yup.array().of(Yup.string()).required('Required'),
    cuisineType: Yup.array().of(Yup.string()).required('Required'),
    dishType: Yup.array().of(Yup.string()),
    dietaryRestrictions: Yup.array().of(Yup.string()),
    setting: Yup.string(),
    tags: Yup.array().of(Yup.string()),
    // Handle file validation separately if needed
  });

  const onSubmit = async (values) => {
    try {
      const token = Cookies.get('jwt');
      const restaurantId = values.restaurant;
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
        {({ values, setFieldValue }) => (

          <Form>
            <Field as="select" name="restaurant">
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name} - {restaurant.location}
                </option>
              ))}
            </Field>
            <ErrorMessage name="restaurant" component="div" />

            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" component="div" />

            <Field name="price" type="number" placeholder="Price" />
            <ErrorMessage name="price" component="div" />

            <MultiSelectCheckbox
              options={MAIN_INGREDIENTS }
              selectedOptions={values.mainIngredients}
              setSelectedOptions={(value) => setFieldValue('mainIngredients', value)}
              label="Main Ingredients"
            />

            <MultiSelectCheckbox
              options={CUISINE_TYPES}
              selectedOptions={values.cuisineType}
              setSelectedOptions={(value) => setFieldValue('cuisineType', value)}
              label="Cuisine Type"
            />

            <MultiSelectCheckbox
              options={DISH_TYPES}
              selectedOptions={values.dishType}
              setSelectedOptions={(value) => setFieldValue('dishType', value)}
              label="Dish Type"
            />

            <MultiSelectCheckbox
              options={DIETARY_RESTRICTIONS}
              selectedOptions={values.dietaryRestrictions}
              setSelectedOptions={(value) => setFieldValue('dietaryRestrictions', value)}
              label="Dietary Restrictions"
            />

            <Field name="setting" as="select">
              <option value="">Select Setting</option>
              {/* Add options for setting */}
            </Field>
            <ErrorMessage name="setting" component="div" />

            <FieldArray
              name="tags"
              render={arrayHelpers => (
                <div>
                  <label>Tags</label>
                  {values.tags && values.tags.length > 0 ? (
                    values.tags.map((tag, index) => (
                      <div key={index}>
                        <Field name={`tags.${index}`} />
                        <button type="button" onClick={() => arrayHelpers.remove(index)}> - </button>
                        <button type="button" onClick={() => arrayHelpers.insert(index, '')}> + </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push('')}>Add a Tag</button>
                  )}
                </div>
              )}
            />

            {/* Add field or separate component for featuredPhotos upload if needed */}

            <button type="submit">Create Dish</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateDish;

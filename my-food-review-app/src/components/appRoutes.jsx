import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Create from "./Create";
import CreateDish from "./Admin/createDish";
import CreateRestaurant from "./Admin/createRestaurant";
import EmailVerification from "./EmailVerification";
// import RestaurantList from "./RestaurantList";
// import RestaurantDetail from "./RestaurantDetail";
// import DishDetail from "./DishDetail";
// import UserProfile from "./UserProfile";

function AppRoutes() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/verify-email" element={<EmailVerification />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/createdish" element={<CreateDish/>} />
        <Route exact path="/createrestaurant" element={<CreateRestaurant/>} />
        {/* <Route exact path="/restaurants" element={<RestaurantList />} />
        <Route exact path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route exact path="/dishes/:id" element={<DishDetail />} />
        <Route exact path="/profile" element={<UserProfile />} /> */}
      </Routes>
  );
}

export default AppRoutes;

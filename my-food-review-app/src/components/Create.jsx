import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function Create() {
  return (
    <div>
      <h1>Welcome to the Food Review App</h1>
      <Logout/>
      <Link to="/createdish">Create Dish</Link>
      <Link to="/createrestaurant" >Create Restaurant</Link>
      <Link to="/adminuserupdate" >Update User</Link>
    </div>
  );
}

export default Create;

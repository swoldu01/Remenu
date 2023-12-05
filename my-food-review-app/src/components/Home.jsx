import React from "react";
import CreateRestaurant from "./Admin/createRestaurant";
import Logout from "./Logout";

function Home() {
  return (
    <div>
      <h1>Welcome to the Food Review App</h1>
      <Logout/>
      <CreateRestaurant/>
    </div>
  );
}

export default Home;

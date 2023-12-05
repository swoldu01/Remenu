import React from "react";
import CreateDish from "./Admin/createDish";
import Logout from "./Logout";

function Home() {
  return (
    <div>
      <h1>Welcome to the Food Review App</h1>
      <Logout/>
     <CreateDish/>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/restaurants">Restaurants</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/create">Create</Link>
    </nav>
  );
}

export default Navbar;
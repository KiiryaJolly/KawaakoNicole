import React from "react";
import {Link }from "react-router-dom";
function Navbar() {
  return (
    <header className="d-flex justify-content-around align-content-center w-100 bg-dark p-3">
      <div>
        <Link to="/">
          <p className="text-light fs-4">
            Nicole <span>TODO</span>
          </p>
        </Link>
      </div>
      <div className="d-flex">
        <Link to="/login">
          <button class="btn btn btn-outline-primary me-3 ps-4 pe-4">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button class="btn btn-outline-secondary ps-4 pe-4 ">Create Account</button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h3>404 Error Page</h3>
      <NavLink to="/">Main Page</NavLink>
    </div>
  );
};

export default Error;

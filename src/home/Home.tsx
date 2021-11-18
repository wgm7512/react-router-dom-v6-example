import React from "react";
import { Outlet, Link } from "react-router-dom";


export default function Home() {

  return (
    <div>
      <h1>Home</h1>
      <p>
        <Link to='/goods'>to goods</Link>
      </p>

      <p>
        <Link to='/customer'>to customer</Link>
      </p>

      <Outlet />
    </div>
  );
}
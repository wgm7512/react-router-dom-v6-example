import React from "react";
import { Link } from "react-router-dom";

export default function Customer() {
  return (
    <div>
      <h2>Customer Page</h2>

      <Link to="/goods"> to Goods</Link>
    </div>
  );
}
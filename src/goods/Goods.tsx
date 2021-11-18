import React from "react";
import { useNavigate, Outlet } from "react-router-dom";


export default function Goods() {
  const navigate = useNavigate();

  const handleClickToHome = () => {
    navigate("/");

    // history 的 replace 模式
    // navigate("/", { replace: true });
  };
  
  return (
    <div>
      <h2>Goods Page</h2>

      <button onClick={handleClickToHome}>to Home</button>

      <Outlet />
    </div>
  );
}
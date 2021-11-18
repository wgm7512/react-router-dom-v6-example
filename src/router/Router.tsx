import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Goods from "../goods/Goods";
import Customer from "../customer/Customer";
import NotFound from "../not-found/NotFound";

export default function Router() {
  {/* 所有的路由配置均在 BrowserRouter 内部 */ }
  return (
    <BrowserRouter>

      {/* 使用 Routes 替换曾经的 Switch */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='goods' element={<Goods />} />
        <Route path='customer' element={<Customer />} />

        {/* 匹配未定义的路由 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Goods from "../goods/Goods";
import Customer from "../customer/Customer";
import NotFound from "../not-found/NotFound";
import GoodsDetail from "../goods/goods-detail/GoodsDetail";
import GoodsList from "../goods/goods-list/GoodsList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='goods' element={<Goods />} >
            {/* 动态路由 */}
            <Route path=":id" element={<GoodsDetail />} />
            <Route path="list" element={<GoodsList />} />
          </Route>

          <Route path='customer' element={<Customer />} ></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
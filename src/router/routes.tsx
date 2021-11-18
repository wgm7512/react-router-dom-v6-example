import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../home/Home";
import Goods from "../goods/Goods";
import Customer from "../customer/Customer";
import NotFound from "../not-found/NotFound";
import GoodsDetail from "../goods/goods-detail/GoodsDetail";
import GoodsList from "../goods/goods-list/GoodsList";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/goods",
        element: <Goods />,
        children: [
          { index: true, element: <GoodsList /> },
          { path: ":id", element: <GoodsDetail /> }
        ]
      },
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  }
];

export default routes;


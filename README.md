# react-router-dom
> `react-router-dom` `v6` 整体体验相对于 `v5` ，体验要好更多，最大的一个改变，就是曾经的 `Route` 不可嵌套，整个路由配置必须拆分成若干小块，除非通过 `react-router-config` 这种插件，才可以实现对整个路由的管理，然而现在，不需要任何插件就可实现对路由配置的管理。

官网地址: [react-router](https://reactrouter.com/docs/en/v6)

当前例子，根据分支对应例子：[react-router-dom-v6-example](https://github.com/wgm7512/react-router-dom-v6-example)
## `v6` 与 `v5` 的区别

### 当前环境
1. 安装
```bash
npm install --save react-router-dom history
```

2. `react`, `react-router-dom` 以及相关插件版本。
```json
"dependencies": {
  "history": "^5.1.0",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-router-dom": "^6.0.2"
}
```

3. 如果是自己通过 `webpack` 配置的项目，一定要在 `devServe` 中加 `historyApiFallback: true` ，解决 `history` 模式页面刷新后出现 `404` 的情况。
```js
devServer: {
  port,
  host,
  hot: true,
  open: true,
  historyApiFallback:{
    disableDotRule: true
  }
},

// 以及 `output` 中的 publicPath
output: {
  path: path.resolve(__dirname, "../dist"),
  filename: "[name].[chunkhash].js",
  publicPath: '/'
},
```

### 使用
> 在入口文件中直接渲染 Router.tsx
```tsx
// idex.tsx
import React from "react";
import ReactDOM from "react-dom";
import Router from "./router/Router";
import "./index";

ReactDOM.render(<Router />, document.getElementById("root"));
```

#### 1. `Routes` 组件替换 `v5` 的 `Switch` 组件；
> `Route` 组件必须使用 `Routes` 嵌套
```tsx
// Router.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Goods from "../goods/Goods";
import Customer from "../customer/Customer";

export default function Router() {
  {/* 所有的路由配置均在 BrowserRouter 内部 */}
  return (
    <BrowserRouter>

      {/* 使用 Routes 替换曾经的 Switch */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='goods' element={<Goods />} />
        <Route path='customer' element={<Customer />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### 2. 跳转
1. 通过 `Link` 组件跳转；
```tsx
// Customer.tsx
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
```

2. 通过 `useNavigate` 方法跳转；
```tsx
// Goods.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
}
```

#### 3. 匹配未定义的路由
> `v6` 移除了 `Redirect` 组件。
```tsx
// Router.tsx
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
```

#### 4. 嵌套路由与动态路由
1. 嵌套路由的 `path` 可以不用写父级，会直接拼接；
2. 动态路由通过 `:style` 的形式实现；
3. 由于 `/goods/list` 的匹配度大于 `/goods/*` ，所以输入精确地址，会精确匹配，而不是匹配到动态路由；
4. 嵌套路由必须在父级追加 `Outlet` 组件，作为子级组件的占位符，类似于 `vue-router` 中的 `router-view` 。
```tsx
// Router.tsx
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
            <Route path=":id" element={<GoodsDetail />}/>
            <Route path="list" element={<GoodsList />}/>
          </Route>

          <Route path='customer' element={<Customer />} ></Route>
        </Route>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}
// Home.tsx
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

// Goods.tsx
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

      {/* 子路由的占位组件 */}
      <Outlet />
    </div>
  );
}
```

#### 5. 获取路由的参数
1. `useParams` 获取动态路由的值；
2. `useSearchParams` 获取查询字符串的值。

```tsx
// GoodsDetail.tsx
import React,{ useEffect } from "react";
import { useParams, useSearchParams  } from "react-router-dom";

export default function GoodsDetail() {
  // 获取动态路由的值
  const params = useParams();

  // 获取查询字符串的值
  const [searchParams, setSearchParams] = useSearchParams();
  

  useEffect(() => {
    // 一个对象，key 为动态字符串的 key
    console.log(params); // {id: '123'}

    // 一个对象，但是不可直接点出属性
    console.log(typeof searchParams); // object

    // 输入 http://localhost:3304/goods/123?name=nihao
    console.log(searchParams.get("name")); // nihao
  }, []);

  const handleAddParams = () => {
    // 修改 查询字符串 的数据
    setSearchParams({
      name:"xxx"
    });
  };
  
  return (
    <div>
      <h2 onClick={handleAddParams}>GoodsDetail Page</h2>
    </div>
  );
}
```


#### 6. 默认路由
> 当页面有多个子路由，比如在 `/goods` 时，页面展示 `商品列表`； `/goods/:id`时，展示某个商品的详情。
1. `Route` 的 `index` 属性就是用来展示默认子路由的。
```tsx
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
            {/* 默认 子路由 ，在页面 路由为 /goods ，会展示该子路由 */}
            <Route index element={<GoodsList />}/>

            <Route path=":id" element={<GoodsDetail />}/>
          </Route>

          <Route path='customer' element={<Customer />} ></Route>
          <Route path="*" element={<NotFound />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
```

#### 7. 通过配置实现路由管理
> `useRoutes` 可以将数组对象形式的路由，直接在页面上使用。

```tsx
// 入口文件，src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index";


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById("root"));

// src/router/routes.tsx
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

// src/App.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";

export default function App() {

  const element = useRoutes(routes);
  return (
    <>
      {element}
    </>
  );
}

```
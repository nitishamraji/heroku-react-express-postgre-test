import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

import Home from "./views/home/Home";
import Settings from "./views/settings/Settings";
import News from "./views/news/News";
import StocksScreener from "./views/stocks-screener/StocksScreener";

const Routes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
  {
    path: "/news",
    layout: DefaultLayout,
    component: News
  },
  {
    path: "/screener",
    layout: DefaultLayout,
    component: StocksScreener
  },
];

export default Routes;

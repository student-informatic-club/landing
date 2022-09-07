import React, { useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { Switch, useLocation } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
// Views
import Home from "./views/Home";
// ADMIN
// import AdminPage from "./admin/Admin";
import 'antd/dist/antd.css';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
// BAN
import BanHocTap from "./Pages/Ban/BanHocTap";
import BanHoTro from "./Pages/Ban/BanHoTro";
import BanKyThuat from "./Pages/Ban/BanKyThuat";
import BanTruyenThong from "./Pages/Ban/BanTruyenThong";
// BLOG AND EVENT
import Blog from "./Pages/Article/blog/Blog";
import BlogDetail from "./Pages/Article/blog/BlogDetail";
import Event from "./Pages/Article/events/Event";
import EventDetail from "./Pages/Article/events/EventDetail";

// Admin
// import Event from "./admin/components/Events";

import { Provider } from "react-redux";
import configureStore from "./components/Scanner/store/configStore";
import { Error404 } from "./components/Error";

// import store
// import store from './store';
// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const config = configureStore();

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    // document.body.classList.add("is-loaded");
    // childRef && childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <>
        <Provider {...config}>
          <ScrollReveal
            ref={childRef}
            children={() => (
                <Switch>
                  <AppRoute
                    exact
                    path="/"
                    component={Home}
                    layout={LayoutDefault}
                  />
                  <AppRoute
                    exact
                    path="/home"
                    component={Home}
                    layout={LayoutDefault}
                  />
                  {/* <AppRoute exact path="/us" component={CommingSoon} layout={LayoutDefault} /> */}
                  <AppRoute exact path="/event" component={Event} />
                  <AppRoute
                    exact
                    path="/event/:postID"
                    component={EventDetail}
                  />
                  <AppRoute exact path="/blog" component={Blog} />
                  <AppRoute exact path="/blog/:postID" component={BlogDetail} />
                  <AppRoute exact path="/ban-hoc-tap" component={BanHocTap} />
                  <AppRoute exact path="/ban-ky-thuat" component={BanKyThuat} />
                  <AppRoute exact path="/ban-ho-tro" component={BanHoTro} />
                  <AppRoute
                    exact
                    path="/ban-truyen-thong"
                    component={BanTruyenThong}
                  />
                  <AppRoute path="*" component={Error404}/>
                </Switch>
            )}
          />
          <NotificationContainer/>
        </Provider>
      {/* <Loading>
      </Loading> */}
    </>
  );
};

export default App;

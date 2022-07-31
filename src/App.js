import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useLocation, Switch, useHistory } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";
import ScrollToTop from "./utils/ScroolToTop";
import Loading from "./utils/Loading";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
import LayoutAdmin from "./layouts/LayoutAdmin";
// Views
import Home from "./views/Home";
// ADMIN
// import AdminPage from "./admin/Admin";
import login from "./views/Login";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
// BAN
import BanHocTap from "./Pages/Ban/BanHocTap";
import BanKyThuat from "./Pages/Ban/BanKyThuat";
import BanHoTro from "./Pages/Ban/BanHoTro";
import BanTruyenThong from "./Pages/Ban/BanTruyenThong";
// BLOG AND EVENT
import Blog from "./Pages/Article/blog/Blog";
import Event from "./Pages/Article/events/Event";
import BlogDetail from "./Pages/Article/blog/BlogDetail";
import EventDetail from "./Pages/Article/events/EventDetail";
import CommingSoon from "./components/CommingSoon";

// Admin
import Dashboard from "./admin/components/Dashboard/index";
import QTV from "./admin/components/QuanTriVien/index";
import BlogAdmin from "./admin/components/Blog";
// import Event from "./admin/components/Events";

import { Provider } from "react-redux";
import configureStore from "./components/Scanner/store/configStore";
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
    childRef && childRef.current.init();
    trackPage(page);
  }, [location]);
  let history = useHistory();
  let loginStatus = JSON.parse(sessionStorage.getItem("LoginStatus"));

  return (
    <>
      <Loading>
        <Provider {...config}>
          <ScrollReveal
            ref={childRef}
            children={() => (
              // <ScrollToTop>
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
                  {history.location.pathname === "/admin" &&
                    (loginStatus === false || loginStatus === null) &&
                    history.push("/loginAdmin") }
                  <AppRoute exact path="/loginAdmin" component={login} />
                  <AppRoute
                    exact
                    path="/admin/Dashboard"
                    component={Dashboard}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/admin/Quan-tri-vien"
                    component={QTV}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/admin/Blog-Event"
                    component={BlogAdmin}
                    layout={LayoutAdmin}
                  />
                </Switch>
              /* </ScrollToTop> */
            )}
          />
          <NotificationContainer/>
        </Provider>
      </Loading>
    </>
  );
};

export default App;

import React, { useEffect, useRef } from "react";
import ReactGA from "react-ga";
import { Switch, useHistory, useLocation } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutDefault from "./layouts/LayoutDefault";
// Views
import Home from "./views/Home";
// ADMIN
// import AdminPage from "./admin/Admin";
import 'antd/dist/antd.css';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import login from "./views/Login";
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
import BlogAdmin from "./admin/components/Blog";
import Dashboard from "./admin/components/Dashboard/index";
import QTV from "./admin/components/QuanTriVien/index";
// import Event from "./admin/components/Events";

import { Provider } from "react-redux";
import AdminPage from "./admin";
import Contact from "./admin/components/Contact";
import configureStore from "./components/Scanner/store/configStore";
import RouteGuard from "./utils/RouteGuard";
import CreateArticle from "./admin/components/Blog/CreateArticle";

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
                  {/* {history.location.pathname === "/admin" &&
                    (loginStatus === false || loginStatus === null) &&
                    history.push("/loginAdmin") } */}
                  <RouteGuard exact path='/admin' component={AdminPage} layout={LayoutAdmin}/>
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
                  <AppRoute
                    exact
                    path="/admin/contact"
                    component={Contact}
                    layout={LayoutAdmin}
                  />
                  <AppRoute
                    exact
                    path="/admin/Blog-Event/add"
                    component={CreateArticle}
                    layout={LayoutAdmin}
                  />
                </Switch>
              /* </ScrollToTop> */
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

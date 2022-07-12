import React, { useRef, useEffect } from "react";
import { useLocation, Switch, useHistory } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
import LayoutAdmin from "./layouts/LayoutAdmin";
// Views
import Home from "./views/Home";
import BanHocTap from "./Pages/Ban/BanHocTap";
import BanKyThuat from "./Pages/Ban/BanKyThuat";
import BanHoTro from "./Pages/Ban/BanHoTro";
import BanTruyenThong from "./Pages/Ban/BanTruyenThong";
import login from "./views/Login";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

// Admin
import Dashboard from './admin/components/Dashboard/index';
import QTV from './admin/components/QuanTriVien/index'
import Blog from "./admin/components/Blog";
import Event from "./admin/components/Events";

import { Provider } from 'react-redux';
import configureStore from './components/Scanner/store/configStore';
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
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  let history = useHistory();
  let loginStatus = JSON.parse(sessionStorage.getItem("LoginStatus"));
  console.log(loginStatus);
  return (
    <>
    <Provider {...config}>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
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
              history.push("/loginAdmin")}
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
              path="/admin/Blog"
              component={Blog}
              layout={LayoutAdmin}
            />
            <AppRoute
              exact
              path="/admin/Event"
              component={Event}
              layout={LayoutAdmin}
            />
            (<AppRoute exact path="/loginAdmin" component={login} />)
          </Switch>
        )}
      />
      <NotificationContainer />
    </Provider>
    </>
  );
};

export default App;

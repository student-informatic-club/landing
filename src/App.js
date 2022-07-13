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
import AdminPage from "./admin/Admin";
import Login from "./views/Login";
import BanHocTap from "./Pages/Ban/BanHocTap";
import BanKyThuat from "./Pages/Ban/BanKyThuat";
import BanHoTro from "./Pages/Ban/BanHoTro";
import BanTruyenThong from "./Pages/Ban/BanTruyenThong";
import login from "./views/Login";
import "react-notifications/lib/notifications.css";
import Store from "./admin/store";
import { NotificationContainer } from "react-notifications";
import Article from "./Pages/Article/Article";
import ArticleDetail from "./Pages/Article/ArticleDetail";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

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

  return (
    <>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute exact path="/event" component={Article} />
            <AppRoute exact path="/event/:postID" component={ArticleDetail} />
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
              path="/admin"
              component={AdminPage}
              layout={LayoutAdmin}
            />
            (<AppRoute exact path="/loginAdmin" component={login} />)
          </Switch>
        )}
      />
      <NotificationContainer />
    </>
  );
};

export default App;

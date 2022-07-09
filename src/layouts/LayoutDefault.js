import React, { useState } from "react";
import Header from "../components/layout/Header";
import navLinks from "../components/layout/partials/HeaderNav";
import Footer from "../components/layout/Footer";

const LayoutDefault = ({ children }) => {
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    window.pageYOffset >= 100 ? setScroll(true) : setScroll(false);
  });
  return (
    <>
      <Header
        navPosition="right"
        // className="reveal-from-bottom"
        scroll={scroll}
        Nav={navLinks}
      />
      <main className="site-content">{children}</main>
      <Footer />
    </>
  );
};

export default LayoutDefault;

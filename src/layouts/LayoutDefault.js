import React, { useState } from "react";
import Header from "../components/layout/Header";
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
      />
      <main className="site-content">{children}</main>
      <Footer />
    </>
  );
};

export default LayoutDefault;

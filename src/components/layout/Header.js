import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "./partials/Logo";
import MessengerCustomerChat from "react-messenger-customer-chat";
import DropDown from "../elements/dropdown";
import {VscTriangleDown} from 'react-icons/vsc';

const propTypes = {
  Nav: PropTypes.array,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  scroll: PropTypes.bool,
};

const defaultProps = {
  Nav: null,
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
  scroll: false,
};

const Header = ({
  className,
  Nav,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  scroll,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    scroll && "scroll",
    className
  );


  return (
    <header {...props} className={classes}>
      <div className=" container container-nav">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Logo />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    {Nav && Nav.map((navLink, index) => {
                      return (
                        <li
                          key={index}
                          className={navLink.dropdown && "hover-dropdown"}
                        >
                          {navLink.dropdown ? (
                            <>
                              <span>{navLink.name} <VscTriangleDown style={{display: 'inline-block'}} className="dropdown-icon"/></span>
                              <DropDown children={navLink.dropdown} />
                            </>
                          ) : (
                            <Link to={navLink.href ? navLink.href : ''} className={navLink.status && 'active'}>{navLink.name}</Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {/* {!hideSignin && (
                    <ul className="list-reset header-nav-right">
                      <li>
                        <Link
                          to="#0"
                          className="button button-primary button-wide-mobile button-sm"
                        >
                          Sign up
                        </Link>
                      </li>
                    </ul>
                  )} */}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
      <MessengerCustomerChat
        pageId="104115109644619"
        appId="3327191804169027"
      />
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;

import React from "react";
import { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import { Link } from "react-router-dom";
const propTypes = {
  children: PropTypes.array,
  isHide: PropTypes.bool,
  theme: PropTypes.string
}

const defaultProps = {
    children: null,
    isHide: false,
    theme: 'dark'
}

const SideBar = ({
    children,
    isHide,
    theme,
    className
}) => {
    const outerclasses = classNames(
        'side_bar',
        `side_bar--${theme}`,
        isHide && 'hide',
        className
    )
    const innerclasses = classNames(
        'side_bar_inner'
    )
  const hamburger = useRef(null);

    return (
        <div className={outerclasses}>
            <div className={innerclasses}>
                <div className="sidebar_logo">
                    <button
                    ref={hamburger}
                    className="header-sidebar-toggle"
                    // onClick={isActive ? closeMenu : openMenu}
                    >
                        <span className="screen-reader">Menu</span>
                        <span className="hamburger">
                        <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <Logo />
                </div>
                <div className="side_bar_list">
                    {children && children.map((item, i) => {
                        return (
                            <div className={item.status ? "side_bar_item--active side_bar_item" : "side_bar_item"}>
                                <Link to={item.href}>{item.name}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

SideBar.prototype = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
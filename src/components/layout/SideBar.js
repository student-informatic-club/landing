import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import { Link } from "react-router-dom";
import {FaAngleDoubleLeft} from 'react-icons/fa';
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
    const [minimize, setMinimize] = useState(false);
    const outerclasses = classNames(
        'side_bar',
        `side_bar--${theme}`,
        isHide && 'hide',
        minimize && 'minimize',
        className
    )
    const innerclasses = classNames(
        'side_bar_inner'
    )
  const handleMinimize = () => {
    setMinimize(!minimize)
  }

    return (
        <div className={outerclasses} id="sidebar">
            <div className={innerclasses}>
                <div className="sidebar_logo">
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
            <div className="minimize-icon" onClick={handleMinimize}>
                <FaAngleDoubleLeft/>
            </div>
        </div>
    )
}

SideBar.prototype = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
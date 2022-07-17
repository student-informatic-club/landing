import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import { Link } from "react-router-dom";
import {FaAngleDoubleLeft} from 'react-icons/fa';
import { sideBar } from "../../admin/store";
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

    const sideBarAdmin = sideBar((state) => state.admin);

    // const handleChangeSideBar = (href) => {
    //     sideBarAdmin.map(item => item.href === href ? item.status = true : item.status = false);
    //     sideBar.setState({admin: sideBarAdmin});
    // }

    return (
        <div className={outerclasses} id="sidebar">
            <div className={innerclasses}>
                <div className="sidebar_logo">
                    <Logo />
                </div>
                <div className="side_bar_list">
                    {children && children.map((item, i) => {
                        return (
                            <Link to={item.href} className={item.status ? "side_bar_item--active side_bar_item" : "side_bar_item"} onClick={() => {sideBarAdmin.map((it) => {
                                it.href === item.href ? it.status = true : it.status = false;
                            })
                                sideBar.setState({admin: sideBarAdmin})
                            }}><span>{item.name}</span></Link>
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
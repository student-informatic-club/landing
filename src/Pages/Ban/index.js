import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import navLinks from "../../components/layout/partials/HeaderNav";
import Logo from "../../components/layout/partials/Logo";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
import './asset/style.scss';
const propTypes = {
  children: Object,
  theme: String
}

const defaultProps = {
    children: {},
    theme: 'dark'
}

const Ban = ({
    children,
    theme,
    className
}) => {
    const classes = classNames(
        `Ban_section Ban_section-${theme}`
    )
    return (
        <div className={className}>
            <section className={classes}>
                <header>
                    <div className="Ban-nav">
                        <div className="navLinks">
                            {navLinks.map((item, i) => {
                                return (
                                    <div className="navLink-item">{item.name}</div>
                                )
                            })}
                        </div>
                        <div>
                            <Logo/>
                        </div>
                    </div>
                </header>
                <section className="Ban-main-content">
                    <div className="f_layout">
                        <div className="f_layout-f">
                            <div className="f_layout-ff">
                                <h1 className="italic"><span>{children.title}</span> {children.name}
                                    <p className="uppercase">{children.clb}</p>
                                </h1>
                            </div>
                            <div className="f_layout-fs">
                                <span>{children.registerMes}</span>
                                <button>{children.btn}</button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div></div>
                    <div></div>
                </section>
                <Cta/>
                <Footer/>
            </section>
        </div>
    )
}

Ban.prototype = propTypes;
Ban.defaultProps = defaultProps;

export default Ban
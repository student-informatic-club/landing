import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import navLinks from "../../components/layout/partials/HeaderNav";
import Logo from "../../components/layout/partials/Logo";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
import './asset/style.scss';
import Slide from "../../components/elements/Slider";
import Slider from "react-slick";
import {MdOutlineDoubleArrow} from "react-icons/md";
import SignUpForm from "../../components/elements/SignUpForm";

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
    const opts = {
        dots: false,
        infinite: true,
        slideToShow: 1,
        slideToScroll: 1,
        nextArrow: <div className="Ban-slides-next"><MdOutlineDoubleArrow/></div>,
        prevArrow: <div className="Ban-slides-previous"><MdOutlineDoubleArrow/></div>,
    }
    const slider = useRef(null)
    const classes = classNames(
        `Ban_section Ban_section-${theme}`
    )
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const handleSignUp = () => {
      setShowSignUpForm(!showSignUpForm)
    }
    return (
        <div className={className}>
      {showSignUpForm && <SignUpForm stateFunc={handleSignUp} ></SignUpForm>}
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

                                <div className="text_desc-ban">
                                <span>{children.registerMes}</span>
                                </div>
                                <div className="Ban-register-btn">
                                    <button className="btn_desc-ban" onClick={handleSignUp}>{children.btn}</button>
                                    <div className="shine"></div>
                                </div>
                            </div>
                        </div>
                        <div className="Ban-slides">
                            <div className="Ban-slides-container">
                                <Slider {...opts} ref={slider}>
                                    {children.imagesIntro.map((item, i) => {
                                        return (
                                            <div className="Ban-slide-item">
                                                <img src={item} />
                                            </div>
                                        )
                                    })}
                                </Slider>
                                <div className="Ban-slides-controls">
                                    <div className="Ban-slides-previous" onClick={() => slider.current.slickPrev()}><MdOutlineDoubleArrow/></div>
                                    <div className="Ban-slides-next" onClick={() => slider.current.slickNext()}><MdOutlineDoubleArrow/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Slogan_page uppercase">
                        <h1>
                            sinh viên giúp sinh viên làm chủ công nghệ
                        </h1>
                    </div>
                    <div>
                        
                    </div>
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
import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";


const propTypes = {
  children: PropTypes.node,
  option: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string
}

const defaultProps = {
    children: null,
    option: {},
    name: '',
    label: ''
}

const Slide = ({
    children,
    option,
    name,
    label,
    className
}) => {
    // const outerClasses = className(
    //     'Ban-section'
    // )
    // const colorArray = ['#A149FA', '#3B44F6', '#3EC70B', '#F7EC09'];
    return (
        <div className="Ban-section">
            <h2 className="Ban-section-header">{label}</h2>
            <Slider {...option} className="Ban-section-slider">
                {children.map((item, i) => {
                    return (
                        <div key={i}>
                            <div style={{backgroundColor: `${item.theme}`}} className="slide-item">
                                <div className="overlay"></div>
                                <span className="slide-title">{item.title}</span>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

Slide.prototype = propTypes;
Slide.defaultProps = defaultProps;

export default Slide;
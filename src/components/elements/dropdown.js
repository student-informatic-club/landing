import react from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    children: PropTypes.array,
    name: PropTypes.string,
    status: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string
}

const defaultProps = {
    children: null,
    name: '',
    status: '',
    disabled: false,
    placeholder: '',
    className: ''
}

const DropDown = ({
    children,
    name,
    status,
    disabled,
    placeholder,
    className,
    ...props
}) => {
    const classes = classNames(
        'dropdown',
        status && `dropdown-${status}`,
        className
    );

    return (
        <>
            <div {...props} className={classes}>
                {children && children.map((item, index) => {
                    return (
                        <div key={index} className="dropdown-item"><span>{item.name}</span></div>
                    )
                })}
            </div>
        </>
    )
}

DropDown.prototype = propTypes;
DropDown.defaultProps = defaultProps;

export default DropDown;
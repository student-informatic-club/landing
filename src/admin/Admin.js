import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SideBar from "../components/layout/SideBar";
const propTypes = {
    children: PropTypes.node
}

const defaultProps = {
    children: null
}

const sideBarAdmin = [
    {name: 'Quản Trị Viên', href: '', status: true},
    {name: 'Quản Trị Viên', href: '', status: false},
    {name: 'Quản Trị Viên', href: '', status: false},
    {name: 'Quản Trị Viên', href: '', status: false},
]

const Admin = ({
    children,
    className
}) => {
    const classes = classNames(
        'site-admin'
    )
    return (
        <section className={classes}>
            <SideBar children={sideBarAdmin}/>
            {children}
        </section>
    )
}

export default Admin
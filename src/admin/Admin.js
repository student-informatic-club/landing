import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SideBar from "../components/layout/SideBar";
import Image from "../components/elements/Image";
import avatar from '../assets/images/admin/avatar.png';
import {FaBell} from 'react-icons/fa';
import {HiOutlineLogout} from 'react-icons/hi';
const propTypes = {
    children: PropTypes.node
}

const defaultProps = {
    children: null
}

const sideBarAdmin = [
    {name: 'Dashboard', href: '', status: true},
    {name: 'Quản Trị Viên', href: '', status: false},
    {name: 'Bài Viết', href: '', status: false},
    {name: 'Sự Kiện', href: '', status: false},
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
            <div className="site-main-admin">
                <div className="site-header-admin">
                    <div className="admin-icons">
                        <FaBell className="admin-icon"/>
                    </div>
                    <div className="header-admin-user">
                        <div className="user-avatar">
                            <Image src={avatar} width={35} height={35} alt="user"/>
                        </div>
                        <HiOutlineLogout className="admin-icon"/>
                    </div>
                </div>
                {children}
            </div>
        </section>
    )
}

export default Admin
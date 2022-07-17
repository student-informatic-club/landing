import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SideBar from "../components/layout/SideBar";
import Image from "../components/elements/Image";
import avatar from '../assets/images/admin/avatar.png';
import {FaBell} from 'react-icons/fa';
import {HiOutlineLogout} from 'react-icons/hi';
import Store, {sideBar} from "../admin/store";
import { useHistory } from "react-router-dom";



const LayoutAdmin = ({children}) => {
    const classes = classNames(
        'site-admin',
    )
    const history = useHistory();
    const sideBarAdmin = sideBar((state) => state.admin);
    console.log(sideBarAdmin);
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
                        <HiOutlineLogout className="admin-icon--logout" onClick={() => {
                            Store.setState({status: false})
                            // eslint-disable-next-line no-restricted-globals
                            confirm("Bạn muốn đăng xuất?") && sessionStorage.setItem('LoginStatus', false)
                            setTimeout(() => {
                                history.push('/loginAdmin');
                            }, 500)
                        }}/>
                    </div>
                </div>
                <main className="main-admin-content">{children}</main>
            </div>
        </section>
    )
}

export default LayoutAdmin
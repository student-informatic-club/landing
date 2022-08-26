import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SideBar from "../components/layout/SideBar";
import Image from "../components/elements/Image";
import avatar from "../assets/images/admin/avatar.png";
import { FaBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import Store, { sideBar } from "../admin/store";
import { useHistory } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../components/layout/partials/Logo";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/admin/Dashboard", <PieChartOutlined />),
  getItem("Admin", "/admin/Quan-tri-vien", <DesktopOutlined />),
  getItem("Bài Viết/Sự Kiện", "/admin/Blog-Event", <UserOutlined />),
];

const LayoutAdmin = ({ children }) => {
  const classes = classNames("site-admin");
  const history = useHistory();
  const sideBarAdmin = sideBar((state) => state.active);
  const [collapse, setCollapse] = useState(false);
  return (
    <section className={classes}>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={(value) => setCollapse(value)}
      >
        <div className="sidebar_logo">
          <Logo />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[sideBarAdmin]}
          items={items}
          mode='inline'
          onSelect={(key) => {
            sideBar.setState({ active: key.key });
            history.push(key.key);
          }}
        />
      </Sider>
      {/* <SideBar children={sideBarAdmin}/> */}
      <div className="site-main-admin">
        <div className="site-header-admin">
          <div className="admin-icons">
            <FaBell className="admin-icon" />
          </div>
          <div className="header-admin-user">
            <div className="user-avatar">
              <Image src={avatar} width={35} height={35} alt="user" />
            </div>
            <HiOutlineLogout
              className="admin-icon--logout"
              onClick={() => {
                Store.setState({ status: false });
                // eslint-disable-next-line no-restricted-globals
                confirm("Bạn muốn đăng xuất?") &&
                  sessionStorage.setItem("LoginStatus", false);
                setTimeout(() => {
                  history.push("/loginAdmin");
                }, 500);
              }}
            />
          </div>
        </div>
        <main className="main-admin-content">{children}</main>
      </div>
    </section>
  );
};

export default LayoutAdmin;

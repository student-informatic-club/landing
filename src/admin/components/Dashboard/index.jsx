import React, { useState } from "react";
import './assets/style.scss';
import { AdminDashboard } from "../../store";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const tabDashboard = AdminDashboard((state) => state.dashboard)
    console.log(tabDashboard);
    const history = useHistory();
    return (
        <section>
            <div className="select-options">
                {tabDashboard.map((item, i) => {
                    return (
                        <div className={item.status ? 'option option--active' : 'option'} key={i} onClick={() => {
                            tabDashboard.map((it) => it.id === item.id ? it.status = true : it.status = false)
                            AdminDashboard.setState({dashboard: tabDashboard})
                            history.push("/admin/Dashboard")
                            console.log(tabDashboard);
                        }}>
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="Dashboard-main-content">

            </div>
        </section>
    )
}

export default Dashboard
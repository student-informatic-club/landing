import React from "react";
import './assets/style.scss';

const Dashboard = () => {
    return (
        <section>
            <div className="select-options">
                <div id="shift-manager" className="option">
                    <span>Quản Lý Lịch Trực</span>
                </div>
                <div id="blog-manager" className="option">
                    <span>Quản Lý Bài Viết</span>
                </div>
                <div id="event-manager" className="option">
                    <span>Quản Lý Sự Kiện</span>
                </div>
                <div id="Ban-manager" className="option">
                    <span>Quản Lý Ban</span>
                </div>
            </div>
            <div>

            </div>
        </section>
    )
}

export default Dashboard
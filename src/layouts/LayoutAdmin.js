import React from "react";
import Header from "../components/layout/Header";

const LayoutAdmin = ({children}) => {
    return (
        <>
            {/* <Header className="header-admin"/> */}
            <main className="site-content">{children}</main>
        </>
    )
}

export default LayoutAdmin
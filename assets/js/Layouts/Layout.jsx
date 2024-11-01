/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef } from "react";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

const Layout = React.memo(({ children }) => {

    const sidebar_active = localStorage.getItem('sidebar_active') === 'true' ? true : false;

    const [isSidebarActive, setSidebarActive] = React.useState(sidebar_active);

    const toggleSidebar = () => {
        localStorage.setItem('sidebar_active', !isSidebarActive);
        setSidebarActive(!isSidebarActive);
    }

    return (
        <>
            <div id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : 'inactive'}`}>
                <AppSidebar toogleSideBar={toggleSidebar} />
            </div>
            <div id="main" className="layout-navbar navbar-fixed">
                <Header toogleSideBar={toggleSidebar} />
                <div id="main-content">
                    {children}
                </div>
            </div>
        </>
    );
});

export default Layout;
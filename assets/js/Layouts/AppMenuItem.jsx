import React, { useEffect, useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
// import { Link } from '@inertiajs/react'

const AppMenuitem = (props) => {
    const [pathname, setPathname] = useState(window.location.pathname);
    const searchParams = '';
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item.to && pathname === item.to;
    const active = activeMenu === key || activeMenu.startsWith(key + '-');

    const onRouteChange = (url) => {
        if (item.to && item.to === url) {
            setActiveMenu(key);
        }
    };

    useEffect(() => {
        const handleNavigation = (event) => {
            setPathname(window.location.pathname);
        };

        // Listen for Inertia's navigation events
        Inertia.on('navigate', handleNavigation);

        // Cleanup listener on unmount
        // return () => {
        //     Inertia.off('navigate', handleNavigation);
        // };
    }, []);

    useEffect(() => {
        onRouteChange(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    const itemClick = (event) => {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // toggle active state
        if (item.items) setActiveMenu(active ? props.parentKey : key);
        else setActiveMenu(key);
    };

    const subMenu = item.items && item.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} className="layout-submenu" in={props.root ? true : active} key={item.label}>
            <ul>
                {item.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
                })}
            </ul>
        </CSSTransition>
    );

    return (
        <li className={`sidebar-item ${active ? 'active' : ''}`}>
            {item.to && !item.items && item.visible !== false ? (
                <InertiaLink href={item.to} replace={item.replaceUrl} target={item.target} onClick={(e) => itemClick(e)} className="sidebar-link">
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                </InertiaLink>
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem;

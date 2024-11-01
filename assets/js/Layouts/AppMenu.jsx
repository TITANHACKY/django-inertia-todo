import React, { useContext } from 'react';
import AppMenuitem from './AppMenuItem';
import { MenuProvider } from './context/menucontext';
// import {Link} from "@inertiajs/react";

const AppMenu = () => {

    const model = [
        // {
        //     label: 'Home',
        //     items: [
        //         { label: 'Todos', icon: 'bi bi-grid-fill', to: "/" },
        //         { label: 'Create', icon: 'bi bi-plus', to: "/create" },
        //     ]
        // },
        { label: 'Todos', icon: 'bi bi-grid-fill', to: "/" },
        { label: 'Create', icon: 'bi bi-plus', to: "/create" },
    ];

    return (
        <div className='sidebar-menu'>
            <MenuProvider>
                <ul className="menu">
                    {model.map((item, i) => {
                        return <AppMenuitem item={item} root={true} index={i} key={item.label} />;
                    })}
                </ul>
            </MenuProvider>
        </div>
    );
};

export default AppMenu;
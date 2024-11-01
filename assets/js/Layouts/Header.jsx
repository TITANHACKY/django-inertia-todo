import React from "react";


const Header = (props) => {
    const toogleSideBar = props.toogleSideBar;
    const [showMailPopUp, setShowMailPopUp] = React.useState(false);
    const [showNotificationPopUp, setShowNotificationPopUp] = React.useState(false);
    const [showProfilePopUp, setShowProfilePopUp] = React.useState(false);

    const toogleMailPopUp = () => {
        setShowMailPopUp(!showMailPopUp);
    }
    const toogleNotificationPopUp = () => {
        setShowNotificationPopUp(!showNotificationPopUp);
    }
    const toogleProfilePopUp = () => {
        setShowProfilePopUp(!showProfilePopUp);
    }
    React.useEffect(() => {
        // Manually initialize the Bootstrap dropdown
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map((dropdownToggleEl) => new window.bootstrap.Dropdown(dropdownToggleEl));
    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand navbar-light navbar-top">
                <div className="container-fluid">
                    <a style={{cursor: 'pointer'}} onClick={toogleSideBar} className="burger-btn d-block">
                        <i className="bi bi-justify fs-3"></i>
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item dropdown me-1">
                                <a style={{cursor: 'pointer'}} className="nav-link active dropdown-toggle text-gray-600" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-envelope bi-sub fs-4"></i>
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end ${showMailPopUp ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <h6 className="dropdown-header">Mail</h6>
                                    </li>
                                    <li><a className="dropdown-item" href="#">No new mail</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-3">
                                <a style={{cursor: 'pointer'}} className="nav-link active dropdown-toggle text-gray-600" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    <i className="bi bi-bell bi-sub fs-4"></i>
                                    <span className="badge badge-notification bg-danger">7</span>
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end notification-dropdown ${showNotificationPopUp ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                    <li className="dropdown-header">
                                        <h6>Notifications</h6>
                                    </li>
                                    <li className="dropdown-item notification-item">
                                        <a className="d-flex align-items-center" href="#">
                                            <div className="notification-icon bg-primary">
                                                <i className="bi bi-cart-check"></i>
                                            </div>
                                            <div className="notification-text ms-4">
                                                <p className="notification-title font-bold">Successfully check out</p>
                                                <p className="notification-subtitle font-thin text-sm">Order ID #256</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="dropdown-item notification-item">
                                        <a className="d-flex align-items-center" href="#">
                                            <div className="notification-icon bg-success">
                                                <i className="bi bi-file-earmark-check"></i>
                                            </div>
                                            <div className="notification-text ms-4">
                                                <p className="notification-title font-bold">Homework submitted</p>
                                                <p className="notification-subtitle font-thin text-sm">Algebra math homework</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <p className="text-center py-2 mb-0"><a href="#">See all notification</a></p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="dropdown">
                            <a style={{cursor: 'pointer'}} href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="user-menu d-flex">
                                    <div className="user-name text-end me-3">
                                        <h6 className="mb-0 text-gray-600">John Ducky</h6>
                                        <p className="mb-0 text-sm text-gray-600">Administrator</p>
                                    </div>
                                    <div className="user-img d-flex align-items-center">
                                        <div className="avatar avatar-md">
                                            <img src="http://localhost:3000/static/dist/compiled/jpg/1.jpg"/>  {/*  TODO :: Need to fix this */}
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 className="dropdown-header">Hello, John!</h6>
                                </li>
                                <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-person me-2"></i> My
                                        Profile</a></li>
                                <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-gear me-2"></i>
                                        Settings</a></li>
                                <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-wallet me-2"></i>
                                        Wallet</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-box-arrow-left me-2"></i> Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
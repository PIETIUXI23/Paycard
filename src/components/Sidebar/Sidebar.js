import React, { useState } from 'react';
import { MENU_ITEMS, FOOTER_ITEMS, MENU_WEBADMIN } from '../../data/menuItems';
import { getFullName, getUserId, getUserRole, getUserSevicePackage } from '~/utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(getUserRole() === 'ROLE_USER' ? MENU_ITEMS : MENU_WEBADMIN);
    const [openMenus, setOpenMenus] = useState({});
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Hàm mở hoặc đóng menu con
    const toggleSubMenu = (id) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className="left_col scroll-view">
            {/* Logo */}
            <div className="navbar nav_title" style={{ border: '0' }}>
                <a href="../" className="site_title">
                    QUẢN LÝ NHÀ TRỌ
                </a>
            </div>

            {/* Tiêu đề */}
            <div className="clearfix" style={{ textAlign: 'center', color: '#73879c' }}>
                SIMPLE HOUSE
            </div>

            {/* Thông tin người dùng */}
            <div className="profile clearfix">
                <div className="profile_pic"></div>
                <div className="profile_info">
                    <span>
                        Xin Chào, <span>{getFullName()}</span>
                    </span>
                </div>
            </div>

            {/* Menu */}
            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                <div className="menu_section">
                    <ul className="nav side-menu">
                        {menu.map((item) => {
                            const isOpen = openMenus[item.id] || false;

                            if (item.label === 'Báo cáo') {
                                return (
                                    <li key={item.id} className={isOpen ? 'active' : ''}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleSubMenu(item.id);
                                            }}
                                        >
                                            <i className={`fa ${item.icon}`}></i> {item.label}
                                            <span className={`fa fa-chevron-${isOpen ? 'up' : 'down'}`}></span>
                                        </a>
                                        {item.subMenu && (
                                            <ul
                                                className="nav child_menu"
                                                style={{ display: isOpen ? 'block' : 'none' }}
                                            >
                                                {item.subMenu.map((child) => (
                                                    <li key={child.id}>
                                                        <Link to={child.path}>
                                                            <i className={`fa ${child.icon}`}></i> {child.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }

                            return (
                                (getUserSevicePackage() === 1 && item.path === '/admin/post') || (
                                    <li key={item.id}>
                                        <Link to={item.path}>
                                            <i className={`fa ${item.icon}`}></i> {item.label}
                                        </Link>
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div className="sidebar-footer hidden-small">
                {FOOTER_ITEMS.map((item) =>
                    item.path === '/logout' ? (
                        <Link
                            key={item.id}
                            title={item.label}
                            onClick={(event) => {
                                event.preventDefault();
                                handleLogout();
                            }}
                        >
                            <i className={`fa ${item.icon}`}></i>
                        </Link>
                    ) : (
                        <Link key={item.id} to={item.path} title={item.label}>
                            <i className={`fa ${item.icon}`}></i>
                        </Link>
                    ),
                )}
            </div>
        </div>
    );
};

export default Sidebar;

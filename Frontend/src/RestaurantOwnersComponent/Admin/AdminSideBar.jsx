import React from 'react';
import { AdminPanelSettings, Category, Dashboard, Event, Fastfood, Logout, Shop2, ShoppingBag } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './../../component/State/Authentication/Action';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <Shop2 />, path: "/menu" },
    { title: "Food Category", icon: <Category />, path: "/category" },
    { title: "Ingredients", icon: <Fastfood />, path: "/ingredients" },
    { title: "Events", icon: <Event />, path: "/event" },
    { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
    { title: "Logout", icon: <Logout />, path: "/" },
];

export const AdminSideBar = ({ open, toggleSidebar }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basePath = "/admin/restaurant";

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
            window.location.reload();
        } else {
            navigate(`${basePath}${item.path}`);
        }
        if (isSmallScreen) {
            toggleSidebar(); // Close sidebar after navigating
        }
    };

    return (
        <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            onClose={toggleSidebar}
            open={open}
            anchor='left'
            sx={{ width: '15%', flexShrink: 0, zIndex: 1 }} // Ensure width is fixed
        >
            <div className='w-full h-screen flex flex-col justify-center text-xl space-y-[1.65rem] pt-16'>
                {menu.map((item, i) => (
                    <React.Fragment key={item.title}>
                        <div onClick={() => handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer' aria-label={item.title}>
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {i !== menu.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </Drawer>
    );
};

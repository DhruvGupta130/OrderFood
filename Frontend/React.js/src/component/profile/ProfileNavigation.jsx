import React from 'react';
import { ShoppingBag, Favorite, Home, AccountBalanceWallet, NotificationsActive, Event, Logout } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const menu = [
    { title: "Orders", icon: <ShoppingBag /> },
    { title: "Favorites", icon: <Favorite /> },
    { title: "Addresses", icon: <Home /> },
    { title: "Payments", icon: <AccountBalanceWallet /> },
    { title: "Notification", icon: <NotificationsActive /> },
    { title: "Events", icon: <Event /> },
    { title: "Logout", icon: <Logout /> }
];

const ProfileNavigation = ({ open, toggleSidebar}) => {
    const isSmallScreen = useMediaQuery('(max-width:1080px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }if (isSmallScreen) {
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
                        <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
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

export default ProfileNavigation;

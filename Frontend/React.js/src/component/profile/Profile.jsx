import React, { useState } from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Addresses from './Addresses';
import Favorites from './Favorites';
import Events from './Events';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const openSidebar = () => {
      setSidebarOpen(true);
    };  

    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* Sidebar Toggle Button */}
            <ProfileNavigation open={sidebarOpen} toggleSidebar={closeSidebar} />
            <div className='w-full'>
              <div className="flex items-center p-4">
                <IconButton 
                    onClick={openSidebar} 
                    sx={{ display: { xs: 'block', lg: 'none' }, marginRight: 2 }} 
                    aria-label="Open sidebar"
                >
                    <MenuIcon />
                </IconButton>
              </div>
                <Routes>
                    <Route path='/' element={<UserProfile />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/addresses' element={<Addresses />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/events' element={<Events />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;

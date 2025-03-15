import React, { useEffect, useState } from 'react';
import { AdminSideBar } from './AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Orders } from './Orders';
import { Menu } from './Menu';
import { FoodCategory } from './FoodCategory';
import { Ingredients } from './Ingredients';
import { Events } from './Events';
import { RestaurantDetails } from './RestaurantDetails';
import { CreateMenuForm } from '../RestaurantForm/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';
import { getRestaurantOrders } from '../../component/State/RestaurantOrder/Action';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Admin = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector(store => store);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getRestaurantsCategory({ token, id: restaurant.usersRestaurant?.id }));
    dispatch(getRestaurantOrders(token, ""));
  }, [dispatch, restaurant.usersRestaurant?.id, token]);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex lg:flex-row flex-col">
      <AdminSideBar open={sidebarOpen} toggleSidebar={closeSidebar} />
      <div className="w-full"> {/* Adjust margin for sidebar width */}
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
          <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/category' element={<FoodCategory />} />
          <Route path='/ingredients' element={<Ingredients />} />
          <Route path='/event' element={<Events />} />
          <Route path='/details' element={<RestaurantDetails />} />
          <Route path='/add-menu' element={<CreateMenuForm />} />
        </Routes>
      </div>
    </div>
  );
};

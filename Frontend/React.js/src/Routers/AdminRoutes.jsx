import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CreateRestaurantForm } from '../RestaurantOwnersComponent/RestaurantForm/CreateRestaurantForm';
import { Admin } from '../RestaurantOwnersComponent/Admin/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByUserId } from '../component/State/Restaurant/Action';

export const AdminRoutes = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector(store => store);

  useEffect(() => {
    if (auth.user) {
      dispatch(getRestaurantByUserId(auth.token || token));
    }
  }, [auth.user, dispatch, token, auth.token]);

  if (!token) {
    return <Navigate to="/account/login" />;
  }

  return (
    <div>
      <Routes>
        <Route 
          path="/*" 
          element={restaurant.usersRestaurant ? <Admin /> : <CreateRestaurantForm />} 
        />
      </Routes>
    </div>
  );
};

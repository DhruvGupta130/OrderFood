import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateRestaurantForm } from '../RestaurantOwnersComponent/RestaurantForm/CreateRestaurantForm';
import { Admin } from '../RestaurantOwnersComponent/Admin/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByUserId } from '../component/State/Restaurant/Action';
import { CircularProgress, Typography, Box } from '@mui/material';

export const AdminRoutes = () => {
    const dispatch = useDispatch();
    const { restaurant, auth } = useSelector(store => store);
    const { usersRestaurant } = restaurant;
    const { error, isLoading } = auth;
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const getRestaurant = async () => {
            setLoad(true);
            try {
                await dispatch(getRestaurantByUserId(localStorage.getItem('token')));
            } catch (err) {
                console.error(err);
            } finally {
                setLoad(false);
            }
        }
        getRestaurant();
    }, [dispatch]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center">
                {error.message || 'Failed to load restaurant data. Please try again later.'}
            </Typography>
        );
    }

    if (load) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Routes>
            <Route
                path="/*"
                element={(usersRestaurant ? <Admin /> : <CreateRestaurantForm />)}
            />
        </Routes>
    );
};
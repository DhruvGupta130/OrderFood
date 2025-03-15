import { Card, Chip, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteIconBorder from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../Config/Logic';

const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { auth } = useSelector(store => store);
    const { isLoading, error, success } = auth;

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        if (success) setOpenSuccess(true);
        if (error) setOpenError(true);
    }, [success, error]);

    const handleAddToFavorite = useCallback(() => {
        if (token) {
            dispatch(addToFavorite({ restaurantId: item.id, token }));
        }
    }, [dispatch, item.id, token]);

    const handleNavigateToRestaurant = useCallback(() => {
        if (item.active) {
            auth.user
                ? navigate(`/restaurant/${item.address?.city}/${item.name}/${item.id}`)
                : navigate('/account/login');
        }
    }, [item.active, auth.user, navigate, item.address?.city, item.name, item.id]);

    const handleCloseSuccess = () => setOpenSuccess(false);
    const handleCloseError = () => setOpenError(false);

    return (
        <Card className='m-5 w-[18rem] h-[19rem]'>
            <div onClick={handleNavigateToRestaurant} className={`${item.active ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img className='w-full h-[10rem] rounded-t-md object-cover' src={item.image || item.images[0]} alt={item.name} />
                <Chip size='small' className='absolute top-2 left-2' color={item.active ? "success" : "error"} label={item.active ? "open" : "closed"} />
            </div>
            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p onClick={handleNavigateToRestaurant} className={`${item.active ? 'cursor-pointer' : 'cursor-not-allowed'} font-semibold text-lg`}>{item.name}</p>
                    <p className='text-gray-500 text-sm'>{item.description}</p>
                </div>
                <div>
                    <IconButton onClick={handleAddToFavorite} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : isPresentInFavorites(auth.favorites, item) ? <FavoriteIcon color='primary' /> : <FavoriteIconBorder />}
                    </IconButton>
                </div>
            </div>

            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default RestaurantCard;

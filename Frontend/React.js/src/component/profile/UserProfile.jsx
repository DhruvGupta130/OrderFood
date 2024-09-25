import { AccountCircle } from '@mui/icons-material';
import { Button, Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../State/Authentication/Action';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <Box 
            className='min-h-[80vh] flex flex-col justify-center items-center text-center p-4'
            sx={{ 
                bgcolor: 'background.default', 
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <AccountCircle sx={{ fontSize: { xs: "6rem", sm: "9rem" }, color: 'primary.main' }} />
            <Typography 
                variant="h5" 
                className='py-2' 
                sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
                {auth.user.fullName}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: 'text.secondary' }}
            >
                Email: {auth.user.email}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: 'text.secondary' }}
            >
                Phone: {auth.user.phone}
            </Typography>
            <Button 
                onClick={handleLogout} 
                variant='contained' 
                sx={{ margin: "1rem 0rem", padding: { xs: '0.5rem 1rem', sm: '0.75rem 1.5rem' } }}
            >
                Logout
            </Button>
        </Box>
    );
}

export default UserProfile;

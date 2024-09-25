import { Avatar, Badge, IconButton, TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { PersonAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchMenuItem } from '../State/Menu/Action';

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, cart } = useSelector(store => store);
    const token = localStorage.getItem("token");
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleProfile = () => {
        navigate(auth.user.role === "ROLE_CUSTOMER" ? "/my-profile" : "/admin/restaurant");
    };

    const handleCartNavigate = () => {
        if (auth.user) {
            navigate("/cart");
            window.location.reload();
        } else {
            alert('You must be logged in to view your cart.'); // Keeping alert for cart access
            navigate("/account/login");
        }
    };

    const handleSearch = () => {
        if (searchKeyword) {
            if (!auth.user || !token) {
                alert('You must be logged in to perform a search.'); // Keeping alert for search access
                return;
            }
            dispatch(searchMenuItem({ keyword: searchKeyword, token }));
            navigate('/search');
            setSearchKeyword('');
        }
    };

    const handleHomeNavigate = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                paddingY: '0.8rem',
                backgroundColor: '#e91e63',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingX: '1rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#d81b60',
                },
            }}
        >
            <Box
                className='logo'
                onClick={handleHomeNavigate}
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: { xs: '0.5rem', sm: '0' },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: '700',
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    𝕋ℍ𝔼 𝔾𝕌ℙ𝕋𝔸'𝕊
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: '0.5rem', sm: '1rem' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search..."
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                                width: { xs: '120px', sm: '250px', md: '350px' },
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                        }}
                        inputProps={{ 'aria-label': 'Search' }} // Accessibility
                    />
                    <IconButton onClick={handleSearch} aria-label="Search">
                        <SearchIcon sx={{ fontSize: "1.5rem", color: 'white' }} />
                    </IconButton>
                </Box>
                <Box>
                    {auth.user ? (
                        <Avatar
                            sx={{ bgcolor: "white", color: pink.A400, cursor: "pointer" }}
                            onClick={handleProfile}
                            aria-label="Profile"
                        >
                            {auth.user.fullName[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton onClick={() => navigate("/account/login")} aria-label="Login">
                            <PersonAdd sx={{ color: 'white' }} />
                        </IconButton>
                    )}
                </Box>
                <Box>
                    <IconButton onClick={handleCartNavigate} aria-label="Cart">
                        <Badge color='secondary' badgeContent={cart.cart?.items.length || 0}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: 'white' }} />
                        </Badge>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

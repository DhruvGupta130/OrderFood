import { Create } from '@mui/icons-material';
import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../component/State/Menu/Action';

export const MenuTables = () => {
    const { menu, restaurant } = useSelector(store => store);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            id: restaurant.usersRestaurant.id,
            token: token,
            vegeterian: false,
            seasonal: false,
            nonVegeterian: false,
            category: ''
        }));
    }, [dispatch, restaurant.usersRestaurant.id, token]);

    const handleIngredientsStock = (id) => {
        dispatch(updateMenuItemsAvailability({ foodId: id, token }));
    };

    if (menu.loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (menu.error) {
        return (
            <Typography variant="h6" color="error" align="center">
                {menu.error.message || 'Failed to load menu data. Please try again later.'}
            </Typography>
        );
    }

    return (
        <Box>
            <Card elevation={3} sx={{ mt: 2, borderRadius: 2, padding: 2 }}>
                <CardHeader
                    title={<Typography variant="h5" sx={{ fontWeight: 'bold', textAlign:"center" }}>Menu</Typography>}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label='add'>
                            <Create />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="menu table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Ingredients</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align='right'>Availability</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems?.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <AvatarGroup>
                                            {item.images?.map((image) => (
                                                <Avatar key={image} src={image} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">
                                        {item.ingredients?.map((ingredient) => (
                                            <Chip sx={{ margin: "0.2rem" }} key={ingredient.id} label={ingredient.name} />
                                        ))}
                                    </TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() => handleIngredientsStock(item.id)}
                                            color={item.available ? "success" : "error"}
                                            variant="outlined"
                                        >
                                            {item.available ? "In Stock" : "Out of Stock"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};
